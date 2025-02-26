import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityCardComponent } from './city-card.component';
import { cityMock } from '../../../mocks/cities.mocks';

describe('<city-card />', () => {
  let component: CityCardComponent;
  let fixture: ComponentFixture<CityCardComponent>;
  const mockedCity = cityMock[1];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCardComponent);
    component = fixture.componentInstance;
    component.city = mockedCity;
    fixture.detectChanges();
  });

  it('should display city details correctly', () => {
    const cityName = fixture.nativeElement.querySelector(
      '[data-testid="city-name"]'
    );
    const cityCountry = fixture.nativeElement.querySelector(
      '[data-testid="city-country"]'
    );
    const cityPopulation = fixture.nativeElement.querySelector(
      '[data-testid="city-population"]'
    );
    const cityLandmarks = fixture.nativeElement.querySelectorAll(
      '[data-testid="city-landmark"]'
    );

    expect(cityName.textContent).toContain(mockedCity.name);
    expect(cityName.textContent).toContain(mockedCity.name_native);
    expect(cityCountry.textContent).toContain(mockedCity.country);
    expect(cityPopulation.textContent).toContain(`8,419,000 inhabitants`);
    expect(cityLandmarks.length).toBe(mockedCity.landmarks.length);
    mockedCity.landmarks.forEach((landmark, index) => {
      expect(cityLandmarks[index].textContent).toContain(landmark);
    });
  });
});
