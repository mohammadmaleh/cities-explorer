import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { CitiesFiltersComponent } from './cities-filters.component';
import { CitiesStore } from '../../../store/cities.store';
import { ReactiveFormsModule } from '@angular/forms';
import {
  continents,
  citiesSortOptions,
} from '../../../constants/cities.constants';

describe('<cities-filters />', () => {
  let component: CitiesFiltersComponent;
  let fixture: ComponentFixture<CitiesFiltersComponent>;
  let store: any;

  beforeEach(async () => {
    const mockStore = {
      setFilter: jasmine.createSpy('setFilter'),
    };

    await TestBed.configureTestingModule({
      imports: [CitiesFiltersComponent, ReactiveFormsModule],
      providers: [{ provide: CitiesStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesFiltersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(CitiesStore);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({
      searchTerm: '',
      continent: '',
      sortBy: '',
    });
  });

  it('should load filter options from constants', () => {
    expect(component.continents).toEqual(continents);
    expect(component.citiesSortOptions).toEqual(citiesSortOptions);
  });

  it('should update search filter with debounce', fakeAsync(() => {
    component.form.get('searchTerm')?.setValue('test');
    tick(300);
    expect(store.setFilter).toHaveBeenCalledWith(
      jasmine.objectContaining({
        searchTerm: 'test',
      })
    );
  }));

  it('should handle continent filter changes', () => {
    component.form.get('continent')?.setValue('Europe');
    expect(store.setFilter).toHaveBeenCalledWith(
      jasmine.objectContaining({
        continent: 'Europe',
      })
    );
  });

  it('should handle sortBy filter changes', () => {
    component.form.get('sortBy')?.setValue('name-asc');
    expect(store.setFilter).toHaveBeenCalledWith(
      jasmine.objectContaining({
        sortBy: { field: 'name', order: 'asc' },
      })
    );
  });

  it('should clear sort filter when empty value', () => {
    component.form.get('sortBy')?.setValue('');
    expect(store.setFilter).toHaveBeenCalledWith(
      jasmine.objectContaining({
        sortBy: undefined,
      })
    );
  });

  it('should trim whitespace from search term', fakeAsync(() => {
    component.form.get('searchTerm')?.setValue('  test  ');
    tick(300);
    expect(store.setFilter).toHaveBeenCalledWith(
      jasmine.objectContaining({
        searchTerm: 'test',
      })
    );
  }));
});
