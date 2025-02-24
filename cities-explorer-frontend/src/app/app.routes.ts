import { Routes } from '@angular/router';
import { CitiesListComponent } from './components/cities-list/cities-list.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { CityGuesserComponent } from './components/city-guesser/city-guesser.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cities-list', pathMatch: 'full' },
  {
    path: 'cities-list',
    loadComponent: () =>
      import('./components/cities-list/cities-list.component').then(
        (module) => module.CitiesListComponent
      ),
  },
  {
    path: 'city-guesser',
    loadComponent: () =>
      import('./components/city-guesser/city-guesser.component').then(
        (module) => module.CityGuesserComponent
      ),
  },
  {
    path: 'city/:id',
    loadComponent: () =>
      import('./components/city-details/city-details.component').then(
        (module) => module.CityDetailsComponent
      ),
  },
];
