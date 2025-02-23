import { Injectable } from '@angular/core';
import {
  City,
  CityFilters,
  CityGuesserQuestion,
} from '../../models/city.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResponse } from '../../models/common.interface';
import { Observable } from 'rxjs';

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

    return this.http.get<PaginatedResponse<City>>(
      'http://localhost:3000/cities',
      {
        params,
      }
    );
  }
  getCity(id: number): Observable<City> {
    return this.http.get<City>(`http://localhost:3000/cities/${id}`);
  }

  getGuessCityQuestion(): Observable<CityGuesserQuestion> {
    return this.http.get<CityGuesserQuestion>(
      'http://localhost:3000/cities/city-guesser'
    );
  }
}
