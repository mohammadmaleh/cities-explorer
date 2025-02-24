import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorFeedbackComponent } from './error-feedback.component';

describe('<error-feedback />', () => {
  let component: ErrorFeedbackComponent;
  let fixture: ComponentFixture<ErrorFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorFeedbackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorFeedbackComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when input provided', () => {
    const testError = 'Network error';
    component.error = testError;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector(
      '[data-testid="error-feedback"]'
    );
    expect(element.textContent).toContain(testError);
  });

  it('should update displayed error when input changes', () => {
    component.error = 'Initial error';
    fixture.detectChanges();
    let element = fixture.nativeElement.querySelector(
      '[data-testid="error-feedback"]'
    );
    expect(element.textContent).toContain('Initial error');

    component.error = 'Updated error';
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector(
      '[data-testid="error-feedback"]'
    );
    expect(element.textContent).toContain('Updated error');
  });

  it('should show warning symbol', () => {
    component.error = 'Test error';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector(
      '[data-testid="error-feedback"]'
    );
    expect(element.textContent).toContain('⚠️');
  });
});
