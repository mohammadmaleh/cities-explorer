import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent],
  template: `<div
    class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col"
  >
    <app-header></app-header>
    <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ng-content></ng-content>
    </main>
  </div> `,
})
export class LayoutComponent {}
