import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { City } from '../../models/city.interface';

@Component({
  selector: 'app-city-card',
  standalone: true,
  imports: [RouterLink],
  template: ` <article
    class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
  >
    <div class="p-6 space-y-4">
      <h3 class="text-2xl font-bold text-gray-900">
        <a
          [routerLink]="['/cities', city.id]"
          class="hover:text-blue-600 transition-colors"
        >
          {{ city.name }}
          <span class="text-lg text-gray-600">• {{ city.country }}</span>
        </a>
      </h3>

      <div class="flex items-center space-x-2 text-gray-500">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span class="text-lg">{{ city.population }}</span>
      </div>

      <div class="border-t border-gray-100 pt-4">
        <div class="flex flex-wrap gap-2">
          @for (landmark of city.landmarks; track landmark) {
          <span
            class="flex items-center px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm font-medium"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clip-rule="evenodd"
              />
            </svg>
            {{ landmark }}
          </span>
          }
        </div>
      </div>
    </div>
  </article>`,
})
export class CityCardComponent {
  @Input({ required: true }) city!: City;
}
