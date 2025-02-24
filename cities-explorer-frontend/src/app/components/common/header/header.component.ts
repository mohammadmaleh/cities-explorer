import { Router } from '@angular/router';
import { City } from './../../../../../../cities-explorer-api/src/interfaces/city.interface';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  template: `
    <header class="bg-white shadow-md">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4 cursor-pointer"
      >
        <h1
          class="text-2xl font-bold text-blue-600"
          (click)="handleLogoClick()"
        >
          🏙️ City Explorer
        </h1>
        <button
          class="btn btn-primary bg-green-400 text-white hover:bg-green-500 px-4 py-2 rounded  cursor-pointer "
          (click)="handlePlayCityGuesser()"
        >
          Play City Guesser
        </button>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  router = inject(Router);

  handlePlayCityGuesser() {
    this.router.navigate(['city-guesser']);
  }

  handleLogoClick() {
    this.router.navigate(['cities-list']);
  }
}
