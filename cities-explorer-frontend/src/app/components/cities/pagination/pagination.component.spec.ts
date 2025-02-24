import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { CitiesStore } from '../../../store/cities.store';

describe('<pagination />', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let mockStore: {
    page: WritableSignal<number>;
    total: WritableSignal<number>;
    limit: WritableSignal<number>;
    setPage: jasmine.Spy;
  };

  beforeEach(async () => {
    mockStore = {
      page: signal(1),
      total: signal(50),
      limit: signal(10),
      setPage: jasmine.createSpy('setPage'),
    };

    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [{ provide: CitiesStore, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct page info', () => {
    const pageInfo = fixture.nativeElement.querySelector(
      '[data-testid="page-info"]'
    ).textContent;
    expect(pageInfo).toContain('Page 1 of 5');
  });

  it('should disable the previous button when on the first page', () => {
    const prevBtn = fixture.nativeElement.querySelector(
      '[data-testid="previous-button"]'
    );
    expect(prevBtn.disabled).toBeTrue();
  });

  it('should disable the next button when on the last page', () => {
    mockStore.page.set(5);
    fixture.detectChanges();
    const nextBtn = fixture.nativeElement.querySelector(
      '[data-testid="next-button"]'
    );
    expect(nextBtn.disabled).toBeTrue();
  });

  it('should call setPage with (current - 1) when previous button is clicked', () => {
    mockStore.page.set(3);
    mockStore.setPage.calls.reset();
    fixture.detectChanges();

    const prevBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="previous-button"]'
    );
    prevBtn.click();
    expect(mockStore.setPage).toHaveBeenCalledWith(2);
  });

  it('should call setPage with (current + 1) when next button is clicked', () => {
    mockStore.page.set(3);
    mockStore.setPage.calls.reset();
    fixture.detectChanges();

    const nextBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="next-button"]'
    );
    nextBtn.click();
    expect(mockStore.setPage).toHaveBeenCalledWith(4);
  });

  it('should not call setPage when previous button is clicked on the first page', () => {
    mockStore.page.set(1);
    mockStore.setPage.calls.reset();
    fixture.detectChanges();

    const prevBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="previous-button"]'
    );
    
    prevBtn.click();
    expect(mockStore.setPage).not.toHaveBeenCalled();
  });

  it('should not call setPage when next button is clicked on the last page', () => {
    mockStore.page.set(5);
    mockStore.setPage.calls.reset();
    fixture.detectChanges();

    const nextBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="next-button"]'
    );
    nextBtn.click();
    expect(mockStore.setPage).not.toHaveBeenCalled();
  });
});
