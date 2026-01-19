import { Component } from '@angular/core';
import { CarbonFootprintForm } from "../carbon-footprint-form/carbon-footprint-form";
import { CarbonFootprintResult } from "../carbon-footprint-result/carbon-footprint-result";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintForm, CarbonFootprintResult, DecimalPipe],
  templateUrl: './carbon-footprint.html',
  styleUrl: './carbon-footprint.scss',
})
export class CarbonFootprint {
  
  public readonly MAX_CONSUMPTION = 7;
  public readonly MIN_CONSUMPTION = 4;

  protected distanceKm: number;
  protected consumptionPer100Km: number;
  protected travels: Array<{ distanceKm: number, consumptionPer100Km: number }>;

  constructor(){
    this.travels = [
      { distanceKm: 50, consumptionPer100Km: 5 },
      { distanceKm: 150, consumptionPer100Km: 6 },
      { distanceKm: 250, consumptionPer100Km: 7 },
      { distanceKm: 350, consumptionPer100Km: 8 },
      { distanceKm: 450, consumptionPer100Km: 9 }
    ];

    this.distanceKm = this.calculateDistanceKm();
    this.consumptionPer100Km = this.calculateConsumptionPer100Km();
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
  
  
  ngOnInit(): void {
    console.log('méthode ngOnInit : Initialisation attributs');
  }
  ngAfterViewInit(): void {
    console.log('méthode ngAfterViewInit : Vue chargée');
  }
  ngOnDestroy(): void {
    console.log('méthode ngOnDestroy : Composant détruit');
  }

  add100Km() {
    this.distanceKm += 100;
  }

  generateTravel() {
    const distanceKm = this.randomIntFromInterval(50, 450);
    const consumptionPer100Km = this.randomIntFromInterval(5, 9);
    this.travels.push({ distanceKm, consumptionPer100Km })
    this.distanceKm = this.calculateDistanceKm();
    this.consumptionPer100Km = this.calculateConsumptionPer100Km();
  }

  private randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
