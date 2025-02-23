import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <div
    class="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 sm:p-8"
  >
    <router-outlet> </router-outlet>
  </div>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
