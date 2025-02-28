import { City, CityGuesserResponse } from 'src/interfaces/city.interface';

export const citiesMock: City[] = [
  {
    id: 1,
    name: 'Sydney',
    name_native: 'Sydney',
    country: 'Australia',
    continent: 'Australia',
    latitude: '-33.865143',
    longitude: '151.209900',
    population: '5312000',
    founded: '1788',
    landmarks: [
      'Sydney Opera House',
      'Sydney Harbour Bridge',
      'Queen Victoria Building',
    ],
  },
  {
    id: 2,
    name: 'New York City',
    name_native: 'New York City',
    country: 'USA',
    continent: 'North America',
    latitude: '40.730610',
    longitude: '-73.935242',
    population: '8419000',
    founded: '1624',
    landmarks: [
      'Chrysler Building',
      'Brooklyn Bridge',
      'Madison Square Garden',
    ],
  },
  {
    id: 3,
    name: 'Madrid',
    name_native: 'Madrid',
    country: 'Spain',
    continent: 'Europe',
    latitude: '40.416775',
    longitude: '-3.703790',
    population: '3223000',
    founded: '1083',
    landmarks: ['Royal Palace', 'Plaza Mayor', 'Plaza de Cibeles'],
  },
  {
    id: 4,
    name: 'Moscow',
    name_native: 'Москва',
    country: 'Russia',
    continent: 'Europe',
    latitude: '55.751244',
    longitude: '37.618423',
    population: '11920000',
    founded: '1147',
    landmarks: ["Saint Basil's Cathedral", 'Kremlin', 'Bolshoi Theatre'],
  },
  {
    id: 5,
    name: 'Tokyo',
    name_native: '東京',
    country: 'Japan',
    continent: 'Asia',
    latitude: '35.652832',
    longitude: '139.839478',
    population: '13960000',
    founded: '1603',
    landmarks: ['Meiji Shrine', 'Asakusa', 'Tokyo Skytree'],
  },
  {
    id: 6,
    name: 'Lagos',
    name_native: 'Lagos',
    country: 'Nigeria',
    continent: 'Africa',
    latitude: '6.465422',
    longitude: '3.406448',
    population: '14800000',
    founded: '1914',
    landmarks: [
      'Iga Idungaran',
      'Freedom Park',
      'The Cathedral Church of Christ',
    ],
  },
  {
    id: 7,
    name: 'Sao Paulo',
    name_native: 'São Paulo',
    country: 'Brazil',
    continent: 'South America',
    latitude: '-23.533773',
    longitude: '-46.625290',
    population: '12330000',
    founded: '1554',
    landmarks: ['Mosteiro De Sao Bento', 'Italian Building', 'Farol Santander'],
  },
  {
    id: 8,
    name: 'Munich',
    name_native: 'München',
    country: 'Germany',
    continent: 'Europe',
    latitude: '48.137154',
    longitude: '11.576124',
    population: '1472000',
    founded: '1158',
    landmarks: ['Bavaria statue', 'Marienplatz', 'Nymphenburg Palace'],
  },
  {
    id: 9,
    name: 'London',
    name_native: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    latitude: '51.507222',
    longitude: '-0.1275',
    population: '8982000',
    founded: '43 AD',
    landmarks: ['Big Ben', 'Tower of London', 'Buckingham Palace'],
  },
  {
    id: 10,
    name: 'Cairo',
    name_native: 'القاهرة',
    country: 'Egypt',
    continent: 'Africa',
    latitude: '30.0444',
    longitude: '31.2357',
    population: '20480000',
    founded: '969 AD',
    landmarks: ['Pyramids of Giza', 'Cairo Citadel', 'Khan el-Khalili'],
  },

  {
    id: 11,
    name: 'Paris',
    name_native: 'Paris',
    country: 'France',
    continent: 'Europe',
    latitude: '48.856613',
    longitude: '2.352222',
    population: '2148000',
    founded: '3rd century BC',
    landmarks: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral'],
  },
  {
    id: 12,
    name: 'Beijing',
    name_native: '北京',
    country: 'China',
    continent: 'Asia',
    latitude: '39.904202',
    longitude: '116.407394',
    population: '21540000',
    founded: '1045 BC',
    landmarks: ['Great Wall of China', 'Forbidden City', 'Temple of Heaven'],
  },
  {
    id: 13,
    name: 'Los Angeles',
    name_native: 'Los Angeles',
    country: 'USA',
    continent: 'North America',
    latitude: '34.052235',
    longitude: '-118.243683',
    population: '3980000',
    founded: '1781',
    landmarks: ['Hollywood Sign', 'Griffith Observatory', 'Santa Monica Pier'],
  },
];
export const cityGuesserQuestionMock: CityGuesserResponse = {
  clues: {
    continent: 'Europe',
    population: '8419000',
    founded: '1624',
    landmark: 'Chrysler Building',
  },
  options: ['Paris', 'London', 'Rome'],
  answer: 'Paris',
};
