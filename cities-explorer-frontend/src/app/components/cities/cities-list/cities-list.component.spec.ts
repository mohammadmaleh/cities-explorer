import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesListComponent } from './cities-list.component';
import { CitiesStore } from '../../../store/cities.store';
import { Router } from '@angular/router';
import { cityMock } from '../../mocks/cities.mocks';

describe('<cities-list />', () => {
  let component: CitiesListComponent;
  let fixture: ComponentFixture<CitiesListComponent>;
  let mockStore: any;
  let mockRouter: any;

  const mockCities = cityMock;

  beforeEach(async () => {
    mockStore = {
      loading: () => false,
      error: () => null,
      cities: () => mockCities,
      loadCities: jasmine.createSpy('loadCities'),
      page: () => 1,
      total: () => 4,
      limit: () => 10,
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [CitiesListComponent],
      providers: [
        { provide: CitiesStore, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call loadCities on init', () => {
    expect(mockStore.loadCities).toHaveBeenCalled();
  });

  describe('when loading', () => {
    it('should display the loading component', () => {
      spyOn(mockStore, 'loading').and.returnValue(true);
      fixture.detectChanges();
      const loadingEl = fixture.nativeElement.querySelector(
        '[data-testid="loading"]'
      );
      expect(loadingEl).toBeTruthy();
    });
  });

  describe('when an error occurs', () => {
    const errorMessage = 'Error loading cities';
    beforeEach(() => {
      spyOn(mockStore, 'loading').and.returnValue(false);
      spyOn(mockStore, 'error').and.returnValue(errorMessage);
      fixture.detectChanges();
    });

    it('should display the error feedback component', () => {
      const errorEl = fixture.nativeElement.querySelector(
        '[data-testid="error-feedback"]'
      );
      expect(errorEl).toBeTruthy();
      expect(errorEl.textContent).toContain(errorMessage);
    });
  });

  describe('when cities data is loaded', () => {
    beforeEach(() => {
      spyOn(mockStore, 'loading').and.returnValue(false);
      spyOn(mockStore, 'error').and.returnValue(null);
      spyOn(mockStore, 'cities').and.returnValue(mockCities);
      fixture.detectChanges();
    });

    it('should display city filters component', () => {
      const filtersEl = fixture.nativeElement.querySelector(
        '[data-testid="cities-filters"]'
      );
      expect(filtersEl).toBeTruthy();
    });

    it('should display a city card for each city', () => {
      const cityCards = fixture.nativeElement.querySelectorAll(
        '[data-testid="city-card"]'
      );
      expect(cityCards.length).toBe(mockCities.length);
    });

    it('should display the pagination component', () => {
      const paginationEl = fixture.nativeElement.querySelector(
        '[data-testid="pagination"]'
      );
      expect(paginationEl).toBeTruthy();
      expect(paginationEl.textContent).toContain('Page 1 of 1');
    });

    it('should navigate to the city details on city card click', () => {
      const firstCityCard = fixture.nativeElement.querySelector(
        '[data-testid="city-card"]'
      );
      firstCityCard.click();
      fixture.detectChanges();
      expect(mockRouter.navigate).toHaveBeenCalledWith([
        'city',
        mockCities[0].id,
      ]);
    });
  });
});
