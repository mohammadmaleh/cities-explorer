import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-feedback',
  imports: [],
  template: `<div class="p-8 bg-red-50 rounded-xl text-red-600 text-center">
    ⚠️ {{ error }}
  </div>`,
})
export class ErrorFeedbackComponent {
  @Input({ required: true }) error: string | null = null;
}
