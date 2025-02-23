import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CitiesState, CityFilters } from '../app/models/city.interface';
import { CitiesService } from '../app/services/api/cities.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

const initialState: CitiesState = {
  cities: [],
  page: 1,
  limit: 10,
  total: 0,
  loading: false,
  error: null,
  filters: {
    searchTerm: undefined,
    continent: undefined,
    sortBy: undefined,
  },
};

export const CitiesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('cities'),
  withState(initialState),
  withMethods((store, citiesService = inject(CitiesService)) => ({
    setFilter(filter: CityFilters) {
      patchState(store, {
        filters: filter,
      });
      this.loadCities();
    },

    setPage(page: number) {
      patchState(store, { page });
      this.loadCities();
    },

    loadCities() {
      patchState(store, {
        loading: true,
        error: null,
      });

      citiesService
        .getCities({
          page: store.page().toString(),
          filters: store.filters(),
        })
        .pipe(finalize(() => patchState(store, { loading: false })))
        .subscribe({
          next: (response) => {
            patchState(store, {
              cities: response.data ?? [],
              total: response.total,
              limit: response.limit,
              page: response.page,
            });
          },
          error: (error: Error) => {
            patchState(store, {
              error: error.message || 'Unknown error occurred',
            });
          },
        });
    },
  }))
);
