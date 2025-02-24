import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [],
  standalone: true,
  template: `
    <button
      class="flex items-center space-x-2 text-blue-500 hover:text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md px-4 py-2 cursor-pointer mb-4"
      (click)="handleGoBack()"
    >
      <span>⬅️</span>
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
