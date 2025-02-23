import {
  citiesSortOptions,
  continents,
} from './../../constants/cities.constants';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CityFilters } from '../../models/city.interface';
import { CommonModule } from '@angular/common';
import { CitiesStore } from '../../../store/cities.store';

@Component({
  selector: 'app-cities-filters',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: ` <form [formGroup]="form" class="mb-12 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <input
          formControlName="searchTerm"
          placeholder="Search city or country"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>
      <div>
        <select
          formControlName="continent"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Continents</option>
          <option
            *ngFor="let continent of continents"
            [value]="continent.value"
          >
            {{ continent.display }}
          </option>
        </select>
      </div>
      <div>
        <select
          formControlName="sortBy"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sort By</option>
          <option
            *ngFor="let option of citiesSortOptions"
            [value]="option.value"
          >
            {{ option.display }}
          </option>
        </select>
      </div>
    </div>
  </form>`,
})
export class CitiesFiltersComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  citiesStore = inject(CitiesStore);

  form = this.formBuilder.group({
    searchTerm: ['', [Validators.maxLength(100)]],
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
