import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CityGuesserComponent } from './city-guesser.component';
import { CitiesStore } from '../../../store/cities.store';
import { cityGuesserQuestionMock } from '../../mocks/cities.mocks';

describe('<city-guesser />', () => {
  let component: CityGuesserComponent;
  let fixture: ComponentFixture<CityGuesserComponent>;
  let mockStore: any;
  let questionValue: any;
  let errorValue: string | null;
  let loadingValue: boolean;

  beforeEach(async () => {
    questionValue = null;
    errorValue = null;
    loadingValue = false;

    mockStore = {
      cityGuesserQuestion: () => questionValue,
      cityGuesserQuestionError: () => errorValue,
      cityGuesserQuestionLoading: () => loadingValue,
      loadCityGuesserQuestion: jasmine.createSpy('loadCityGuesserQuestion'),
    };

    await TestBed.configureTestingModule({
      imports: [CityGuesserComponent],
      providers: [{ provide: CitiesStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(CityGuesserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call loadCityGuesserQuestion on init', () => {
    expect(mockStore.loadCityGuesserQuestion).toHaveBeenCalled();
  });

  describe('when in loading state', () => {
    beforeEach(() => {
      loadingValue = true;
      fixture.detectChanges();
    });

    it('should display the loading component', () => {
      const loadingEl = fixture.nativeElement.querySelector(
        '[data-testid="loading"]'
      );
      expect(loadingEl).toBeTruthy();
    });
  });

  describe('when an error occurs', () => {
    beforeEach(() => {
      loadingValue = false;
      errorValue = 'Test error occurred';
      fixture.detectChanges();
    });

    it('should display the error feedback component', () => {
      const errorEl = fixture.nativeElement.querySelector(
        '[data-testid="error-feedback"]'
      );
      expect(errorEl).toBeTruthy();
    });
  });

  describe('when a question is loaded', () => {
    beforeEach(() => {
      loadingValue = false;
      errorValue = null;
      questionValue = cityGuesserQuestionMock;
      fixture.detectChanges();
    });

    it('should display the title and current streak', () => {
      const titleEl = fixture.nativeElement.querySelector(
        '[data-testid="title"]'
      );
      expect(titleEl.textContent).toContain('Test your geography knowledge');

      const streakEl = fixture.nativeElement.querySelector(
        '[data-testid="streak"]'
      );
      expect(streakEl.textContent.trim()).toBe('0');
    });

    it('should display clues correctly', () => {
      const continentEl = fixture.nativeElement.querySelector(
        '[data-testid="continent"]'
      );
      expect(continentEl.textContent.trim()).toBe(
        cityGuesserQuestionMock.clues.continent
      );

      const populationEl = fixture.nativeElement.querySelector(
        '[data-testid="population"]'
      );

      expect(populationEl.textContent).toContain('8,419,000');

      const foundedEl = fixture.nativeElement.querySelector(
        '[data-testid="founded"]'
      );

      expect(foundedEl.textContent.trim()).toBe(
        cityGuesserQuestionMock.clues.founded
      );

      const landmarkEl = fixture.nativeElement.querySelector(
        '[data-testid="landmark"]'
      );
      expect(landmarkEl.textContent.trim()).toBe(
        cityGuesserQuestionMock.clues.landmark
      );
    });

    it('should render all answer option buttons with correct test IDs', () => {
      cityGuesserQuestionMock.options.forEach((option: string) => {
        const btn = fixture.nativeElement.querySelector(
          `[data-testid="city-option-${option}"]`
        );
        expect(btn).toBeTruthy();
        expect(btn.textContent).toContain(option);
      });
    });

    it('should update streak and call loadCityGuesserQuestion on correct answer', fakeAsync(() => {
      expect(component.streak).toBe(0);
      const correctBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
        `[data-testid="city-option-${cityGuesserQuestionMock.answer}"]`
      );
      correctBtn.click();
      fixture.detectChanges();

      expect(component.showAnswer).toBeTrue();
      expect(component.streak).toBe(1);

      tick(1000);
      fixture.detectChanges();

      expect(mockStore.loadCityGuesserQuestion).toHaveBeenCalledTimes(2);
      expect(component.showAnswer).toBeFalse();
    }));

    it('should reset streak and call loadCityGuesserQuestion on incorrect answer', fakeAsync(() => {
      component.streak = 3;
      fixture.detectChanges();

      const incorrectOption = cityGuesserQuestionMock.options.find(
        (opt: string) => opt !== cityGuesserQuestionMock.answer
      );
      const incorrectBtn: HTMLButtonElement =
        fixture.nativeElement.querySelector(
          `[data-testid="city-option-${incorrectOption}"]`
        );
      incorrectBtn.click();
      fixture.detectChanges();

      expect(component.showAnswer).toBeTrue();
      expect(component.streak).toBe(0);

      tick(1000);
      fixture.detectChanges();

      expect(mockStore.loadCityGuesserQuestion).toHaveBeenCalledTimes(2);
      expect(component.showAnswer).toBeFalse();
    }));
  });
});
