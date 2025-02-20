import { createActionGroup } from '@ngrx/store';
import { City } from '../interfaces/city.interface';

export const citiesActions = createActionGroup({
  source: 'Cities',
  events: {
    getCities: (query: any) => ({ query }),
    getCitiesSuccess: (cities: City[]) => ({ cities }),
    getCitiesFailure: (error: any) => ({ error }),
  },
});
