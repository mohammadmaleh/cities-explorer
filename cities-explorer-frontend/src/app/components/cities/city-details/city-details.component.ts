import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { CitiesStore } from '../../../store/cities.store';
import { LoadingComponent } from '../../common/loading/loading.component';
import { ErrorFeedbackComponent } from '../../common/error-feedback/error-feedback.component';
import { BackButtonComponent } from '../../common/back-button/back-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-details',
  imports: [
    GoogleMap,
    MapMarker,
    LoadingComponent,
    ErrorFeedbackComponent,
    BackButtonComponent,
    CommonModule,
  ],
  standalone: true,
  template: `<div class="w-full">
    <app-back-button></app-back-button>

    @if (loading()) {
    <app-loading></app-loading>
    } @else { @if (error()) {
    <app-error-feedback [error]="error() || ''"></app-error-feedback>
    } @else {
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div class="space-y-8">
        <div class="space-y-4">
          <h1 class="text-5xl font-bold text-gray-900">
            {{ city()?.name }}
          </h1>
          <div class="flex items-center space-x-2 text-2xl text-gray-600">
            <span>{{ city()?.country }}</span>
            <span class="text-gray-400">•</span>
            <span>{{ city()?.continent }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="p-6 bg-blue-50">
            <div class="text-sm text-blue-600">Population</div>
            <div class="text-3xl font-bold text-gray-900">
              {{ city()?.population }}
            </div>
          </div>
          <div class="p-6 bg-blue-50">
            <div class="text-sm text-blue-600">Founded</div>
            <div class="text-3xl font-bold text-gray-900">
              {{ city()?.founded }}
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-6">Landmarks</h2>
          @for (landmark of city()?.landmarks ; track landmark) {
          <div class="space-y-4 py-2">
            <div
              class="flex items-center p-4 bg-white shadow-sm border border-gray-100"
            >
              <span class="text-2xl mr-3">📍</span>
              <span class="text-lg text-gray-700">{{ landmark }}</span>
            </div>
          </div>
          }
        </div>
      </div>

      <div class="h-[600px] overflow-hidden shadow-xl border border-gray-200">
        <google-map
          [center]="{ lat: lat(), lng: lng() }"
          [zoom]="12"
          width="100%"
          height="100%"
        >
          <map-marker [position]="{ lat: lat(), lng: lng() }"></map-marker>
        </google-map>
      </div>
    </div>
    } }
  </div> `,
})
export class CityDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private citiesStore = inject(CitiesStore);
  loading = this.citiesStore.loading;
  error = this.citiesStore.error;
  city = this.citiesStore.selectedCity;
  lat = computed<number>(() => Number(this.city()?.latitude) ?? 0);
  lng = computed(() => Number(this.city()?.longitude) ?? 0);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const cityId = Number(params['id']) || undefined;

      if (cityId) {
        this.citiesStore.loadCity(cityId);
      } else {
        this.router.navigate(['cities-list']);
      }
    });
  }

  ngOnDestroy() {
    this.citiesStore.clearSelectedCity();
  }
}
