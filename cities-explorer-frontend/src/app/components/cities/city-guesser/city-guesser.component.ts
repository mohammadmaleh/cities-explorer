import { Component, inject, OnInit } from '@angular/core';
import { CitiesStore } from '../../../store/cities.store';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../common/loading/loading.component';
import { BackButtonComponent } from '../../common/back-button/back-button.component';
import { ErrorFeedbackComponent } from '../../common/error-feedback/error-feedback.component';

@Component({
  selector: 'app-city-guesser',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    BackButtonComponent,
    ErrorFeedbackComponent,
  ],
  template: `<div class="max-w-2xl mx-auto space-y-8">
    <app-back-button></app-back-button>

    <h1
      class="text-3xl font-bold text-gray-500 text-center"
      data-testid="title"
    >
      Test your geography knowledge
    </h1>

    <div class="text-center animate-fade-in">
      <span class="inline-block px-4 py-2 bg-white rounded-full shadow-md">
        🔥 Current Streak:
        <span class="font-bold text-blue-600" data-testid="streak">
          {{ streak }}
        </span>
      </span>
    </div>

    @if (loading()) {
    <app-loading></app-loading>
    } @else { @if (error()) {
    <app-error-feedback [error]="error() || ''" />
    } @else {
    <h2 class="text-3xl font-bold text-gray-500 text-center">
      Guess the city:
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-6 bg-white shadow-sm space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-blue-500">🌍</span>
          <h3 class="font-semibold text-gray-700">Continent</h3>
        </div>
        <p class="text-lg font-medium text-gray-900" data-testid="continent">
          {{ cityGuesserQuestion()?.clues?.continent }}
        </p>
      </div>

      <div class="p-6 bg-white shadow-sm space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-blue-500">👥</span>
          <h3 class="font-semibold text-gray-700">Population</h3>
        </div>
        <p class="text-lg font-medium text-gray-900" data-testid="population">
          {{ cityGuesserQuestion()?.clues?.population | number }} inhabitants
        </p>
      </div>

      <div class="p-6 bg-white shadow-sm space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-blue-500">🏛️</span>
          <h3 class="font-semibold text-gray-700">Founded</h3>
        </div>
        <p class="text-lg font-medium text-gray-900" data-testid="founded">
          {{ cityGuesserQuestion()?.clues?.founded || 'Unknown' }}
        </p>
      </div>

      <div class="p-6 bg-white shadow-sm space-y-2">
        <div class="flex items-center gap-2">
          <span class="text-blue-500">🏙️</span>
          <h3 class="font-semibold text-gray-700">Landmark</h3>
        </div>
        <p class="text-lg font-medium text-gray-900" data-testid="landmark">
          {{ cityGuesserQuestion()?.clues?.landmark }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-3">
      @for (option of cityGuesserQuestion()?.options; track option) {
      <button
        data-testid
        [attr.data-testid]="'city-option-' + option"
        (click)="answerCityGuesserQuestion(option)"
        [ngClass]="{
          'bg-green-200 border-green-400 text-grey-900':
            showAnswer && option === cityGuesserQuestion()?.answer,
          'bg-red-200 border-red-400 text-grey-900':
            showAnswer && option !== cityGuesserQuestion()?.answer,
          'bg-blue-400 border-blue-400 hover:bg-blue-500 text-white':
            !showAnswer
        }"
        class="p-4 text-center rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border-2 border-gray-100 cursor-pointer"
        [disabled]="!cityGuesserQuestion"
      >
        <span class="text-lg font-medium">{{ option }}</span>
      </button>
      }
    </div>
    } }
  </div> `,
})
export class CityGuesserComponent implements OnInit {
  citiesStore = inject(CitiesStore);
  cityGuesserQuestion = this.citiesStore.cityGuesserQuestion;
  error = this.citiesStore.cityGuesserQuestionError;
  loading = this.citiesStore.cityGuesserQuestionLoading;
  streak = 0;
  showAnswer = false;

  ngOnInit() {
    this.citiesStore.loadCityGuesserQuestion();
  }

  answerCityGuesserQuestion(answer: string) {
    const question = this.cityGuesserQuestion();
    if (!question) return;
    this.showAnswer = true;
    if (answer === question.answer) {
      this.streak += 1;
    } else {
      this.streak = 0;
    }
    setTimeout(() => {
      this.citiesStore.loadCityGuesserQuestion();
      this.showAnswer = false;
    }, 1000);
  }
}
