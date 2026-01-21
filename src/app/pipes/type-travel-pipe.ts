import { Pipe, PipeTransform } from '@angular/core';
import { TravelType } from '../models/travel';

@Pipe({
  name: 'typeTravelToFrench'
})
export class TypeTravelPipe implements PipeTransform {

  transform(value: TravelType): string {
    switch (value) {
      case "plane":
        return 'Avion';
      case "train":
        return 'Train';
      case "car":
        return 'Voiture';
      default:
        return '';
    }
  }

}
