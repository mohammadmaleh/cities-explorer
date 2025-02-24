import { Injectable } from '@angular/core';
import {
  City,
  CityFilters,
  CityGuesserQuestion,
} from '../../interfaces/city.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse } from '../../interfaces/common.interface';
import { Observable } from 'rxjs';
import { APP_URL } from '.';

export const CITIES_URL = `${APP_URL}/cities`;

@Injectable({ providedIn: 'root' })
export class CitiesService {
  constructor(private http: HttpClient) {}

  getCities({ page, filters }: { page: string; filters: CityFilters }) {
    let params = new HttpParams().set('page', page);

    if (filters.searchTerm)
      params = params.set('searchTerm', filters.searchTerm);
    if (filters.continent) params = params.set('continent', filters.continent);
    if (filters.sortBy)
      params = params.set(
        'sortBy',
        `${filters.sortBy.field}:${filters.sortBy.order}`
      );

    return this.http.get<PaginatedResponse<City>>(CITIES_URL, {
      params,
    });
  }
  getCity(id: number): Observable<City> {
    return this.http.get<City>(`${CITIES_URL}/${id}`);
  }

  getGuessCityQuestion(): Observable<CityGuesserQuestion> {
    return this.http.get<CityGuesserQuestion>(`${CITIES_URL}/city-guesser`);
  }
}
