import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CitiesState, CityFilters } from '../interfaces/city.interface';
import { CitiesService } from '../services/api/cities.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

const initialState: CitiesState = {
  cities: [],
  selectedCity: null,
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
  cityGuesserQuestion: null,
  cityGuesserQuestionLoading: false,
  cityGuesserQuestionError: null,
};

export const CitiesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('cities'),
  withState(initialState),
  withMethods((store, citiesService = inject(CitiesService)) => ({
    setFilter(filter: CityFilters) {
      patchState(store, {
        filters: filter,
        page: 1,
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

    loadCity(id: number) {
      const existingCity = store.cities().find((c) => c.id === id);
      if (existingCity) {
        patchState(store, {
          selectedCity: existingCity,
          error: null,
        });
        return;
      }

      patchState(store, {
        loading: true,
        error: null,
      });

      citiesService
        .getCity(id)
        .pipe(finalize(() => patchState(store, { loading: false })))
        .subscribe({
          next: (city) => patchState(store, { selectedCity: city }),
          error: (error) =>
            patchState(store, {
              error: error.message || 'Failed to load city details',
            }),
        });
    },

    clearSelectedCity() {
      patchState(store, {
        selectedCity: null,
        error: null,
      });
    },
    loadCityGuesserQuestion() {
      patchState(store, {
        cityGuesserQuestionLoading: true,
        cityGuesserQuestionError: undefined,
      });
      citiesService
        .getGuessCityQuestion()
        .pipe(
          finalize(() =>
            patchState(store, { cityGuesserQuestionLoading: false })
          )
        )
        .subscribe({
          next: (question) => {
            console.log({ question });

            return patchState(store, { cityGuesserQuestion: question });
          },
          error: (error) =>
            patchState(store, {
              cityGuesserQuestionError:
                error.message || 'Failed to load city details',
            }),
        });
    },
  }))
);
