export interface CityRaw {
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

export interface City extends CityRaw {
  id: number;
}

export interface CityGuesserResponse {
  clues: {
    continent: string;
    population: string;
    founded: string;
    landmark: string;
  };
  options: string[];
  answer: string;
}
