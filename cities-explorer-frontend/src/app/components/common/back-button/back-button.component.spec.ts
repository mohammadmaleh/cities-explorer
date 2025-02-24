import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BackButtonComponent } from './back-button.component';
import { Router } from '@angular/router';

describe('<back-button />', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;
  let router: Router;

  const getButton = () =>
    fixture.nativeElement.querySelector('[data-testid="back-button"]');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButtonComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the provided link when clicked', () => {
    component.link = '/test-link';
    fixture.detectChanges();

    getButton().click();
    expect(router.navigate).toHaveBeenCalledWith(['/test-link']);
  });

  it('should navigate to cities-list when no link is provided', () => {
    component.link = '';
    fixture.detectChanges();

    getButton().click();
    expect(router.navigate).toHaveBeenCalledWith(['cities-list']);
  });

  it('should display "Back" text on the button', () => {
    expect(getButton().textContent.trim()).toBe('Back');
  });
});
