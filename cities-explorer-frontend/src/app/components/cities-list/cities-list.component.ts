import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CitiesStore } from '../../../store/cities.store';
@Component({
  selector: 'app-cities-list',
  imports: [CommonModule],
  template: `
    <div *ngFor="let city of store.cities()">
      {{ city.name }} - {{ city.country }}
    </div>
  `,
})
export class CitiesListComponent {
  store = inject(CitiesStore);
  ngOnInit() {
    this.store.loadCities({});
  }
}
