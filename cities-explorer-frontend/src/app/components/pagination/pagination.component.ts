import { Component, inject } from '@angular/core';
import { CitiesStore } from '../../../store/cities.store';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `<div class="flex items-center justify-between">
    <button
      (click)="previousPage()"
      [disabled]="store.page() === 1"
      class="px-4 py-2 rounded-lg disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600"
    >
      Previous
    </button>

    <span class="text-gray-600">
      Page {{ store.page() }} of {{ totalPages }}
    </span>

    <button
      (click)="nextPage()"
      [disabled]="store.page() === totalPages"
      class="px-4 py-2 rounded-lg disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600"
    >
      Next
    </button>
  </div> `,
})
export class PaginationComponent {
  store = inject(CitiesStore);

  // Using a getter here to compute totalPages from signals
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
