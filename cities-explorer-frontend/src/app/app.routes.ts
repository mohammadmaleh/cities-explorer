import { Routes } from '@angular/router';
import { CitiesListComponent } from './components/cities-list/cities-list.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { CityGuesserComponent } from './components/city-guesser/city-guesser.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cities-list', pathMatch: 'full' },
  { path: 'cities-list', component: CitiesListComponent },
  { path: 'city-guesser', component: CityGuesserComponent },
  { path: 'city/:id', component: CityDetailsComponent },
];
