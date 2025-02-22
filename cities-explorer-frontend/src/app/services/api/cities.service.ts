import { Injectable } from '@angular/core';
import { City, CityFilters } from '../../models/city.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResponse } from '../../models/common.interface';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CitiesService {
  constructor(private http: HttpClient) {}

  getCities({
    page,
    limit,
    filters,
  }: {
    page: string;
    limit: string;
    filters: CityFilters;
  }) {
    let params = new HttpParams().set('page', page).set('limit', limit);

    // Add filters if they exist
    if (filters.country) params = params.set('country', filters.country);
    if (filters.continent) params = params.set('continent', filters.continent);
    // if (filters.sortBy) params = params.set('sortBy', filters.sortBy);

    return this.http.get<PaginatedResponse<City>>(
      'http://localhost:3000/cities',
      {
        params,
      }
    );
  }
}
