import { createReducer, on } from '@ngrx/store';
import { City } from '../interfaces/city.interface';
import { citiesActions } from './cities.actions';

export const initialCitiesState: City[] = [];

export const citiesReducer = createReducer(
  initialCitiesState,
  on(citiesActions.getCitiesSuccess, (state, { cities }) => cities),
  on(citiesActions.getCitiesFailure, (state, { error }) => [])
);
