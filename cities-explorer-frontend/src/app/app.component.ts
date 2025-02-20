import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { citiesActions } from './store/cities.actions';
import { selectCities } from './store/cities.selectors';
import { Observable } from 'rxjs';
import { City } from './interfaces/city.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  template: `<router-outlet>
    <div *ngFor="let city of cities$ | async">
      <h1>{{ city.name }}</h1>
    </div>
  </router-outlet>`,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'cities-explorer-frontend';
  constructor(private store: Store) {}
  cities$!: Observable<ReadonlyArray<City>>;

  ngOnInit(): void {
    this.store.dispatch(citiesActions.getCities({}));
    this.cities$ = this.store.select(selectCities);
  }
}
