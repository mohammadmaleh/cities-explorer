import {
  citiesSortOptions,
  continents,
} from '../../../constants/cities.constants';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CityFilters } from '../../../interfaces/city.interface';
import { CommonModule } from '@angular/common';
import { CitiesStore } from '../../../store/cities.store';

@Component({
  selector: 'app-cities-filters',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `<form
    data-testid="cities-filters"
    [formGroup]="form"
    class="mb-6 space-y-6"
  >
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <input
          data-testid="search-input"
          formControlName="searchTerm"
          placeholder="Search city or country"
          class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
        />
      </div>
      <div>
        <select
          data-testid="continent-select"
          formControlName="continent"
          class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">All Continents</option>
          @for (continent of continents; track continent.value) {
          <option [value]="continent.value">
            {{ continent.display }}
          </option>
          }
        </select>
      </div>
      <div>
        <select
          data-testid="sort-select"
          formControlName="sortBy"
          class="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Sort By</option>
          @for (option of citiesSortOptions; track option) {
          <option [value]="option.value">
            {{ option.display }}
          </option>
          }
        </select>
      </div>
    </div>
  </form> `,
})
export class CitiesFiltersComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  citiesStore = inject(CitiesStore);

  form = this.formBuilder.group({
    searchTerm: ['', [Validators.maxLength(30)]],
    continent: [''],
    sortBy: [''],
  });
  continents: any;
  citiesSortOptions: any;

  ngOnInit() {
    this.form.controls.searchTerm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.emitFilters());

    this.form.controls.continent.valueChanges.subscribe((value) =>
      this.emitFilters({ ...this.form.value, continent: value })
    );
    this.form.controls.sortBy.valueChanges.subscribe((value) =>
      this.emitFilters({ ...this.form.value, sortBy: value })
    );

    this.continents = continents;
    this.citiesSortOptions = citiesSortOptions;
  }

  private emitFilters(formValue = this.form.value) {
    const [field, order] = formValue.sortBy
      ? formValue.sortBy.split('-')
      : [undefined, undefined];

    const filters: CityFilters = {
      searchTerm: formValue.searchTerm?.trim() || undefined,
      continent: (formValue.continent as CityFilters['continent']) || undefined,
      sortBy: field
        ? {
            field,
            order: order as 'asc' | 'desc',
          }
        : undefined,
    };

    this.citiesStore.setFilter(filters);
  }
}
