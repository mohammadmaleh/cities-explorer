import { Component, inject } from '@angular/core';
import { CitiesStore } from '../../../store/cities.store';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `<div
    class="flex items-center justify-between"
    data-testid="pagination"
  >
    <div class="flex gap-2">
      <button
        data-testid="previous-button"
        (click)="previousPage()"
        [disabled]="store.page() === 1"
        class="px-4 py-2 rounded-lg disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600"
      >
        Previous
      </button>
      <button
        data-testid="next-button"
        (click)="nextPage()"
        [disabled]="store.page() === totalPages"
        class="px-4 py-2 rounded-lg disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600"
      >
        Next
      </button>
    </div>

    <span class="text-gray-600" data-testid="page-info">
      Page {{ store.page() }} of {{ totalPages }}
    </span>
  </div> `,
})
export class PaginationComponent {
  store = inject(CitiesStore);

  get totalPages(): number {
    return Math.ceil(this.store.total() / this.store.limit());
  }

  previousPage() {
    const current = this.store.page();
    if (current > 1) {
      this.store.setPage(current - 1);
    }
  }

  nextPage() {
    const current = this.store.page();
    if (current < this.totalPages) {
      this.store.setPage(current + 1);
    }
  }
}
