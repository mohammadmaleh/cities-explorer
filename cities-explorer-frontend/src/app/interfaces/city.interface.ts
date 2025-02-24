import { Pagination } from './common.interface';

export interface City {
  id: number;
  name: string;
  name_native: string;
  country: string;
  continent: string;
  latitude: string;
  longitude: string;
  population: string;
  founded: string;
  landmarks: string[];
}

export interface CityFilters {
  searchTerm?: string;
  continent?:
    | 'africa'
    | 'asia'
    | 'europe'
    | 'north-america'
    | 'oceania'
    | 'south-america';
  sortBy?: {
    field: string;
    order: 'asc' | 'desc';
  };
}

export interface CityGuesserQuestion {
  clues: {
    continent: string;
    population: string;
    founded: string;
    landmark: string;
  };
  options: string[];
  answer: string;
}

export interface CitiesState extends Pagination {
  cities: City[];
  selectedCity: City | null;
  loading: boolean;
  error: string | null;
  filters: CityFilters;
  cityGuesserQuestion: CityGuesserQuestion | null;
  cityGuesserQuestionLoading: boolean;
  cityGuesserQuestionError: string | null;
}
