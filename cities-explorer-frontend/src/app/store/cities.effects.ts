import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { citiesActions } from './cities.actions';
import { CitiesService } from './cities.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CitiesEffects {
  constructor(private citiesService: CitiesService) {}
  private actions$ = inject(Actions);

  getCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(citiesActions.getCities),
      mergeMap(() =>
        this.citiesService.getCities({}).pipe(
          map((cities) => citiesActions.getCitiesSuccess(cities)),
          catchError((error) => of(citiesActions.getCitiesFailure({ error })))
        )
      )
    )
  );
}
