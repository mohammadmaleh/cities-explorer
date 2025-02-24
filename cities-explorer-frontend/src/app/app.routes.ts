import { Routes } from '@angular/router';
import { CitiesListComponent } from './components/cities/cities-list/cities-list.component';
import { CityDetailsComponent } from './components/cities/city-details/city-details.component';
import { CityGuesserComponent } from './components/cities/city-guesser/city-guesser.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cities-list', pathMatch: 'full' },
  {
    path: 'cities-list',
    loadComponent: () =>
      import('./components/cities/cities-list/cities-list.component').then(
        (module) => module.CitiesListComponent
      ),
  },
  {
    path: 'city-guesser',
    loadComponent: () =>
      import('./components/cities/city-guesser/city-guesser.component').then(
        (module) => module.CityGuesserComponent
      ),
  },
  {
    path: 'city/:id',
    loadComponent: () =>
      import('./components/cities/city-details/city-details.component').then(
        (module) => module.CityDetailsComponent
      ),
  },
];
