import { Injectable } from '@angular/core';
import { Travel } from '../models/travel';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintCompute {
  private travels: Array<Travel>;

  constructor(){
    this.travels = [
      { distanceKm: 50, consumptionPer100Km: 5, quantiteCO2: -1 },
      { distanceKm: 150, consumptionPer100Km: 6, quantiteCO2: -1 },
      { distanceKm: 250, consumptionPer100Km: 7, quantiteCO2: -1 },
      { distanceKm: 350, consumptionPer100Km: 8, quantiteCO2: -1 },
      { distanceKm: 450, consumptionPer100Km: 9, quantiteCO2: -1 }
    ];

    this.travels.forEach((travel) => {
      travel.quantiteCO2 = (travel.distanceKm * travel.consumptionPer100Km) / 100 * 2.3;
    })
  }


  getTravels(): Array<Travel> {
    return this.travels;
  }

  addTravel(travel: { distanceKm: number, consumptionPer100Km: number }) {
    const _travel: Travel = { ...travel, quantiteCO2: (travel.distanceKm * travel.consumptionPer100Km) / 100 * 2.3 }
    this.travels.push(_travel);
  }

  getResumeTravels(): { totaleDistance: number, averageConsumption: number, quantiteCO2Totale: number } {
    return { 
      totaleDistance: this.calculateDistanceKm(), 
      averageConsumption: this.calculateConsumptionPer100Km(),
      quantiteCO2Totale: this.calculateQuantiteCO2Totale()
    }
  }

  private calculateConsumptionPer100Km(): number {
    return this.travels.reduce((acc, val) => {
      return acc + val.consumptionPer100Km;
    }, 0) / this.travels.length;
  }

  private calculateDistanceKm(): number {
    return this.travels.reduce((acc, val) => {
      return acc + val.distanceKm;
    }, 0);
  }

  private calculateQuantiteCO2Totale(): number {
    return this.travels.reduce((acc, val) => {
      return acc + val.quantiteCO2;
    }, 0);
  }
}
