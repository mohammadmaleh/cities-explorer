import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('<header />', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render header with correct test ID', () => {
    expect(
      fixture.nativeElement.querySelector('[data-testid="header"]')
    ).toBeTruthy();
  });

  it('should navigate to city-list when clicking on logo', () => {
    const logo = fixture.nativeElement.querySelector('[data-testid="logo"]');
    logo.click();
    expect(router.navigate).toHaveBeenCalledWith(['cities-list']);
  });

  it('should navigate to city-guesser when clicking on play button', () => {
    const playButton = fixture.nativeElement.querySelector(
      '[data-testid="play-city-guesser-button"]'
    );
    playButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['city-guesser']);
  });
});
