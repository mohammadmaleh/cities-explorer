import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [],
  standalone: true,
  template: `
    <button
      class="px-4 py-2 rounded-lg disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 mb-4"
      (click)="handleGoBack()"
      data-testid="back-button"
    >
      <span>Back</span>
    </button>
  `,
})
export class BackButtonComponent {
  @Input() link: string = '';
  router = inject(Router);

  handleGoBack() {
    if (this.link) {
      this.router.navigate([this.link]);
    } else {
      this.router.navigate(['cities-list']);
    }
  }
}
