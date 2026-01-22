import { computed, Injectable, signal } from '@angular/core';
import { Travel, TravelType } from '../models/travel';
import { CarbonFootprintAPI } from './carbon-footprint-api';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintCompute {
  private _travels = signal<Travel[]>([]);
  readonly travels = this._travels.asReadonly();

  constructor(private readonly api: CarbonFootprintAPI){
    this.getTravels().subscribe(travels => this._travels.set(travels));
  }

  private async getQuantityCO2ByTravel(travel: { distance: number, consommation: number, travelType: TravelType }): Promise<number> {
    return (await firstValueFrom(this.api.calculateC02(travel))).empreinteCarbone;
  }

  private getTravels(): Observable<Array<Travel>> {
    return this.api.getTravels();
  }

  async addTravel(travel: { distance: number, consommation: number, travelType: TravelType }) {    
    this.api.addTravel({ ...travel, co2: await this.getQuantityCO2ByTravel(travel), userId: 1 }).subscribe(
      () => this.getTravels().subscribe(travels => this._travels.set(travels))
    );
  }

  getResumeTravels(): { totaleDistance: number, averageConsumption: number, quantityCO2Totale: number } {
    return { 
      totaleDistance: this.calculateDistanceKm(), 
      averageConsumption: this.calculateConsumptionPer100Km(),
      quantityCO2Totale: this.calculatequantityCO2Totale()
    }
  }

  private calculateConsumptionPer100Km(): number {
    return this.travels().reduce((acc, val) => {
      return acc + val.consommation;
    }, 0) / this.travels().length;
  }

  private calculateDistanceKm(): number {
    return this.travels().reduce((acc, val) => {
      return acc + val.distance;
    }, 0);
  }

  private calculatequantityCO2Totale(): number {
    return this.travels().reduce((acc, val) => {
      return acc + val.co2;
    }, 0);
  }
}
