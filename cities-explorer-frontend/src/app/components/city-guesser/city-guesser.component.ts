import { Component, inject, OnInit } from '@angular/core';
import { CitiesStore } from '../../../store/cities.store';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../common/loading/loading.component';

@Component({
  selector: 'app-city-guesser',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  template: `
    <div class="max-w-2xl mx-auto space-y-8">
      <h1 class="text-3xl font-bold  text-gray-500 text-center">
        Test your geography knowledge
      </h1>

      <div class="text-center animate-fade-in">
        <span class="inline-block px-4 py-2 bg-white rounded-full shadow-md">
          🔥 Current Streak:
          <span class="font-bold text-blue-600">{{ streak }}</span>
        </span>
      </div>
      @if(loading()){
      <app-loading />
      } @else if (error()){
      <div class="p-6 bg-white rounded-xl shadow-sm space-y-2">
        <h3 class="font-semibold text-gray-700">Error</h3>
        <p class="text-lg font-medium text-gray-900">
          {{ error() }}
        </p>
      </div>
      } @else if(cityGuesserQuestion()){
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-6 bg-white rounded-xl shadow-sm space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-blue-500">🌍</span>
            <h3 class="font-semibold text-gray-700">Continent</h3>
          </div>
          <p class="text-lg font-medium text-gray-900">
            {{ cityGuesserQuestion()?.clues?.continent }}
          </p>
        </div>

        <div class="p-6 bg-white rounded-xl shadow-sm space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-blue-500">👥</span>
            <h3 class="font-semibold text-gray-700">Population</h3>
          </div>
          <p class="text-lg font-medium text-gray-900">
            {{ cityGuesserQuestion()?.clues?.population | number }}
            inhabitants
          </p>
        </div>

        <div class="p-6 bg-white rounded-xl shadow-sm space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-blue-500">🏛️</span>
            <h3 class="font-semibold text-gray-700">Founded</h3>
          </div>
          <p class="text-lg font-medium text-gray-900">
            {{ cityGuesserQuestion()?.clues?.founded || 'Unknown' }}
          </p>
        </div>

        <div class="p-6 bg-white rounded-xl shadow-sm space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-blue-500">🏙️</span>
            <h3 class="font-semibold text-gray-700">Landmark</h3>
          </div>
          <p class="text-lg font-medium text-gray-900">
            {{ cityGuesserQuestion()?.clues?.landmarks }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols- gap-3">
        <button
          *ngFor="let option of cityGuesserQuestion()?.options"
          (click)="answerCityGuesserQuestion(option)"
          [ngClass]="{
            'bg-green-200 border-green-400':
              showAnswer && option === cityGuesserQuestion()?.answer,
            'bg-red-200 border-red-400':
              showAnswer && option !== cityGuesserQuestion()?.answer,
            'bg-white': !showAnswer
          }"
          class="p-4 text-left rounded-xl transition-all duration-200
              shadow-sm hover:shadow-md
               border-2 border-gray-100 
              "
          [disabled]="!cityGuesserQuestion"
        >
          <span class="text-lg font-medium text-gray-900">{{ option }}</span>
        </button>
      </div>

      }
    </div>
`,
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
