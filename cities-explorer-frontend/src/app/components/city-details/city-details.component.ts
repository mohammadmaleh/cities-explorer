// city-details.component.ts
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { CitiesStore } from '../../../store/cities.store';
import { LoadingComponent } from '../common/loading/loading.component';

@Component({
  selector: 'app-city-details',
  imports: [GoogleMap, MapMarker, LoadingComponent],
  standalone: true,
  template: `
    @if (loading()) {
    <app-loading />
    } @else if (error()) {
    <div class="text-red-500 p-8">{{ error() }}</div>
    } @else if (city()) {
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      @if (loading()) {
      <app-loading />
      ) } @else if (error()) {
      <div class="p-8 bg-red-50 rounded-xl text-red-600 text-center">
        ⚠️ {{ error() }}
      </div>
      ) } @else if (city()) {
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-5xl font-bold text-gray-900">{{ city()?.name }}</h1>
            <div class="flex items-center space-x-2 text-2xl text-gray-600">
              <span>{{ city()?.country }}</span>
              <span class="text-gray-400">•</span>
              <span>{{ city()?.continent }}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="p-6 bg-blue-50 rounded-xl">
              <div class="text-sm text-blue-600">Population</div>
              <div class="text-3xl font-bold text-gray-900">
                {{ city()?.population }}
              </div>
            </div>
            <div class="p-6 bg-blue-50 rounded-xl">
              <div class="text-sm text-blue-600">Founded</div>
              <div class="text-3xl font-bold text-gray-900">
                {{ city()?.founded }}
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Landmarks</h2>
            <div class="space-y-4">
              @for (landmark of city()?.landmarks; track landmark) {
              <div
                class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <svg
                  class="w-6 h-6 text-blue-500 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span class="text-lg text-gray-700">{{ landmark }}</span>
              </div>
              }
            </div>
          </div>
        </div>

        <div
          class="h-[600px] rounded-2xl overflow-hidden shadow-xl border border-gray-200"
        >
          <google-map
            [center]="{ lat: lat(), lng: lng() }"
            [zoom]="12"
            width="100%"
            height="100%"
          >
            <map-marker [position]="{ lat: lat(), lng: lng() }" />
          </google-map>
        </div>
      </div>
      }
    </div>
    }
  `,
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
