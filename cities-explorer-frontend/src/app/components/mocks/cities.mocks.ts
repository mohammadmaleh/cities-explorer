export const cityMock = [
  {
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
];

export const cityGuesserQuestionMock = {
  clues: {
    continent: 'Europe',
    population: '8419000',
    founded: '1624',
    landmarks: [
      'Chrysler Building',
      'Brooklyn Bridge',
      'Madison Square Garden',
    ],
    options: ['Paris', 'London', 'Rome'],
    answer: 'Paris',
  },
};
