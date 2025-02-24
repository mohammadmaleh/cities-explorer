import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-feedback',
  imports: [],
  template: `<div
    class="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md text-center"
  >
    ⚠️ {{ error }}
  </div>`,
})
export class ErrorFeedbackComponent {
  @Input({ required: true }) error: string | null = null;
}
