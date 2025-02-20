import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  getCities(query: any): Observable<City[]> {
    return of([
      {
        id: 1,
        name: 'Sydney',
        name_native: 'Sydney',
        country: 'Australia',
        continent: 'Australia',
        latitude: '-33.865143',
        longitude: '151.209900',
        population: '5312000',
        founded: '1788',
        landmarks: [
          'Sydney Opera House',
          'Sydney Harbour Bridge',
          'Queen Victoria Building',
        ],
      },
    ]);
  }
}
