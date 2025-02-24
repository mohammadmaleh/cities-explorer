import { Component, inject } from '@angular/core';
import { CitiesStore } from '../../../store/cities.store';
import { CityCardComponent } from '../city-card/city-card.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { CitiesFiltersComponent } from '../cities-filters/cities-filters.component';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../common/loading/loading.component';
import { ErrorFeedbackComponent } from '../../common/error-feedback/error-feedback.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cities-list',
  imports: [
    CityCardComponent,
    PaginationComponent,
    CitiesFiltersComponent,
    LoadingComponent,
    ErrorFeedbackComponent,
    CommonModule,
  ],
  template: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <app-cities-filters></app-cities-filters>

    <ng-container *ngIf="store.loading(); else loadedContent">
      <app-loading></app-loading>
    </ng-container>

    <ng-template #loadedContent>
      <ng-container *ngIf="store.error(); else cityGrid">
        <app-error-feedback [error]="store.error() || ''"></app-error-feedback>
      </ng-container>

      <ng-template #cityGrid>
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-h-[60vh] overflow-auto"
        >
          <ng-container *ngFor="let city of store.cities()">
            <app-city-card
              [city]="city"
              (click)="handleCityClick(city.id)"
            ></app-city-card>
          </ng-container>
        </div>
        <div class="mt-12">
          <app-pagination></app-pagination>
        </div>
      </ng-template>
    </ng-template>
  </div> `,
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
