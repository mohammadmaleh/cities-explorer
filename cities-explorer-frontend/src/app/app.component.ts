import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CitiesListComponent } from './components/cities-list/cities-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CitiesListComponent],
  template: `<router-outlet> <app-cities-list /> </router-outlet>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
