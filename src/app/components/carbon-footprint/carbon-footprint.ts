import { Component, computed, signal, Signal } from '@angular/core';
import { CarbonFootprintForm } from "../carbon-footprint-form/carbon-footprint-form";
import { CarbonFootprintResult } from "../carbon-footprint-result/carbon-footprint-result";
import { DecimalPipe, registerLocaleData, UpperCasePipe } from '@angular/common';
import localeFr from "@angular/common/locales/fr";
import { CarbonFootprintCompute } from '../../services/carbon-footprint-compute';
import { Travel } from '../../models/travel';
import { TypeTravelPipe } from '../../pipes/type-travel-pipe';
registerLocaleData(localeFr);

@Component({
  selector: 'app-carbon-footprint',
  imports: [CarbonFootprintForm, CarbonFootprintResult, DecimalPipe, UpperCasePipe, TypeTravelPipe],
  templateUrl: './carbon-footprint.html',
  styleUrl: './carbon-footprint.scss',
})
export class CarbonFootprint {
  
  public readonly MAX_CONSUMPTION: number = 7;
  public readonly MIN_CONSUMPTION: number = 4;
  public readonly DISTANCE_MAX: number = 500;
  public readonly DISTANCE_MIN: number = 100;

  protected distanceKm: Signal<number>;
  protected consumptionPer100Km: Signal<number>;
  protected quantityCO2Totale: Signal<number>;
  protected travels: Signal<Array<Travel>>;

  constructor(private readonly cfc: CarbonFootprintCompute){
    this.travels = cfc.travels;
    const resume = computed(() => {
      if (this.travels().length > 0) {
        return this.cfc.getResumeTravels();
      }
      return null;
    });

    this.distanceKm = computed(() => resume()?.totaleDistance ?? 0);
    this.consumptionPer100Km = computed(() => resume()?.averageConsumption ?? 0);
    this.quantityCO2Totale = computed(() => resume()?.quantityCO2Totale ?? 0);
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
    // this.distanceKm() += 100;
  }

  generateTravel() {
    const distance = this.randomIntFromInterval(50, 450);
    const consommation = this.randomIntFromInterval(5, 9);
    this.cfc.addTravel({ distance, consommation, travelType: "plane" })
  }

  private randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
