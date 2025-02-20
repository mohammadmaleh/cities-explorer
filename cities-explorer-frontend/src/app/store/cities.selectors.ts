import { createSelector, createFeatureSelector } from '@ngrx/store';
import { City } from '../interfaces/city.interface';

export const selectCitiesState = createFeatureSelector<City[]>('cities');

export const selectCities = createSelector(
  selectCitiesState,
  (cities: City[]) => cities
);

