import { Component, inject } from '@angular/core';
import { CitiesStore } from '../../../store/cities.store';
import { CityCardComponent } from '../city-card/city-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { CitiesFiltersComponent } from '../cities-filters/cities-filters.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cities-list',
  standalone: true,
  imports: [CityCardComponent, PaginationComponent, CitiesFiltersComponent],
  template: ` <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Explore Cities</h1>
    <app-cities-filters></app-cities-filters>
    @if (store.loading()) {
    <div class="text-center p-12 space-y-4">
      <div
        class="animate-pulse inline-block w-12 h-12 bg-blue-500 rounded-full"
      ></div>
      <div class="text-gray-600">Loading cities...</div>
    </div>
    ) } @else if (store.error()) {
    <div class="p-8 bg-red-50 rounded-xl text-red-600 text-center">
      ⚠️ {{ store.error() }}
    </div>
    ) } @else {
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      @for (city of store.cities(); track city.id) {
      <app-city-card [city]="city" (click)="handleCityClick(city.id)" />
      }
    </div>

    <div class="mt-12">
      <app-pagination />
    </div>
    }
  </div>`,
})
export class CitiesListComponent {
  store = inject(CitiesStore);
  router = inject(Router);
  
  ngOnInit() {
    this.store.loadCities();
  }

  handleCityClick(cityId: number) {
    this.router.navigate(['city', cityId]);
  }
}
