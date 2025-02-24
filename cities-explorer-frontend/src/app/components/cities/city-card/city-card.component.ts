import { Component, Input } from '@angular/core';
import { City } from '../../../interfaces/city.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-card',
  imports: [CommonModule],
  standalone: true,
  template: `<article
    class="group bg-white shadow-sm hover:shadow-md min-h-[250px] transition-all duration-300 cursor-pointer"
  >
    <div class="p-6 space-y-4">
      <h3 class="text-2xl font-bold text-gray-900 truncate">
        {{ city.name }} ({{ city.name_native }})
      </h3>
      <h4 class="text-lg font-semibold text-gray-700 truncate">
        🌍 {{ city.country }}
      </h4>
      <div class="flex items-center space-x-2 text-gray-500">
        <span class="text-lg pb-1">👥</span>
        <span class="text-lg">{{ city.population }} inhabitants</span>
      </div>

      <div class="border-t border-gray-100 pt-4">
        <div class="flex flex-col gap-2">
          @for (landmark of city.landmarks; track landmark) {
          <span
            class="flex items-center px-3 py-1 bg-blue-50 text-blue-800 text-sm font-medium w-fit"
          >
            <span class="mr-1">📍</span>
            {{ landmark }}
          </span>
          }
        </div>
      </div>
    </div>
  </article> `,
})
export class CityCardComponent {
  @Input({ required: true }) city!: City;
}
