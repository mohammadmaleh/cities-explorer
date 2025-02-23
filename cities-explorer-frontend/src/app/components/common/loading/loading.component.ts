import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  imports: [],
  template: ` <div class="text-center p-8">
    <div class="inline-block animate-spin text-blue-500 text-4xl">🌍</div>
  </div>`,
})
export class LoadingComponent {}
