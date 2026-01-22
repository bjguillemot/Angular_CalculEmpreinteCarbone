import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Travel, TravelType } from '../models/travel';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintAPI {

  private readonly BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }
  

  getTravels(): Observable<Travel[]>{
    let arrayTravels: Travel[] = [];
    return this.http.get<Travel[]>(`${this.BASE_URL}/tousMesVoyages/1`).pipe(
      map(
        data => {
          data.forEach((element: Travel) => {
            const travel: Travel = {
              id: element.id,
              distance: element.distance,
              consommation: element.consommation,
              co2: element.co2,
              travelType: element.travelType,
              date: element.date,
              userId: element.userId,
            }
            arrayTravels.push(travel)
          });
          return arrayTravels;
        }
      )
    );
  }

  addTravel(travel: { userId: number, distance: number, consommation: number, co2: number, travelType: TravelType }) {
    const body = travel;
    return this.http.post(`${this.BASE_URL}/ajouterUnVoyage`, body);
  }


  calculateC02(travel: { distance: number, consommation: number, travelType: TravelType }): Observable<{ empreinteCarbone: number }> {
    switch (travel.travelType) {
      case "plane":
        return this.calculateC02Plane(travel.distance);
      case "train":
        return this.calculateC02Train(travel.distance);
      case "car":
        return this.calculateC02Car(travel.distance, travel.consommation);
      default:
        return this.calculateC02Car(travel.distance, travel.consommation);
    }
  }

  private calculateC02Car(distance: number, consommation: number): Observable<{ empreinteCarbone: number }> {
    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetVoiture?distanceKm=${distance}&consommationPour100Km=${consommation}`);
  }

  private calculateC02Plane(distance: number): Observable<{ empreinteCarbone: number }> {
    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetAvion?distanceKm=${distance}`);
  }

  private calculateC02Train(distance: number): Observable<{ empreinteCarbone: number }> {
    return this.http.get<{ empreinteCarbone: number }>(`${this.BASE_URL}/calculerTrajetTrain?distanceKm=${distance}`);
  }
}
