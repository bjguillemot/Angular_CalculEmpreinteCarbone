import { Injectable } from '@angular/core';
import { Travel, TravelType } from '../models/travel';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintCompute {
  private travels: Array<Travel>;

  constructor(){
    this.travels = [
      { distanceKm: 50,  consumptionPer100Km: 5, type: "plane", quantityCO2: -1 },
      { distanceKm: 150, consumptionPer100Km: 6, type: "plane", quantityCO2: -1 },
      { distanceKm: 250, consumptionPer100Km: 7, type: "plane", quantityCO2: -1 },
      { distanceKm: 350, consumptionPer100Km: 8, type: "plane", quantityCO2: -1 },
      { distanceKm: 450, consumptionPer100Km: 9, type: "plane", quantityCO2: -1 }
    ];

    this.travels.forEach((travel) => {
      travel.quantityCO2 = this.getQuantityCO2ByTravel(travel);
    })
  }

  private getQuantityCO2ByTravel(travel: { distanceKm: number, consumptionPer100Km: number, type: TravelType }): number {
    switch (travel.type) {
      case "plane":
        return travel.distanceKm * 0.2
        break;
      case "train":
        return travel.distanceKm * 0.03;
        break;
      case "car":
        return (travel.distanceKm * travel.consumptionPer100Km) / 100 * 2.3
        break;
      default:
        return (travel.distanceKm * travel.consumptionPer100Km) / 100 * 2.3;
        break;
    }
  }

  getTravels(): Array<Travel> {
    return this.travels;
  }

  addTravel(travel: { distanceKm: number, consumptionPer100Km: number, type: TravelType }) {
    const _travel: Travel = { ...travel, quantityCO2: this.getQuantityCO2ByTravel(travel) }
    this.travels.push(_travel);
  }

  getResumeTravels(): { totaleDistance: number, averageConsumption: number, quantityCO2Totale: number } {
    return { 
      totaleDistance: this.calculateDistanceKm(), 
      averageConsumption: this.calculateConsumptionPer100Km(),
      quantityCO2Totale: this.calculatequantityCO2Totale()
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

  private calculatequantityCO2Totale(): number {
    return this.travels.reduce((acc, val) => {
      return acc + val.quantityCO2;
    }, 0);
  }
}
