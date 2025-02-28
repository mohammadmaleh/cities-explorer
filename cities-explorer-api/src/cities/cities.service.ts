import { Injectable, NotFoundException } from '@nestjs/common';
import {
  City,
  CityGuesserResponse,
  CityRaw,
} from '../interfaces/city.interface';
import { readFileSync } from 'fs';
import { join } from 'path';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';
import { PaginatedResponse } from 'src/interfaces/common.interface';

@Injectable()
export class CitiesService {
  private cities: City[];
  private limit = 10;
  constructor() {
    this.loadCities();
  }

  private loadCities() {
    const data: string = readFileSync(
      join(__dirname, '../../data/cities.json'),
      'utf8',
    );
    const jsonData = JSON.parse(data) as { cities: CityRaw[] };

    this.cities = jsonData.cities.map((city: CityRaw, index: number) => ({
      id: index + 1,
      ...city,
    }));
  }

  getCities(query: GetCitiesQueryDto): PaginatedResponse<City> {
    let filteredCities = [...this.cities];

    if (query.continent) {
      filteredCities = filteredCities.filter(
        (city) =>
          city.continent.toLowerCase() === query.continent?.toLowerCase(),
      );
    }

    if (query.searchTerm) {
      const searchLower = query.searchTerm.toLowerCase();

      filteredCities = filteredCities.filter(
        (city) =>
          city.name.toLowerCase().includes(searchLower) ||
          city.country.toLowerCase().includes(searchLower),
      );
    }

    if (query.sortBy) {
      const [sortField, sortOrder] = query.sortBy.split(':');

      filteredCities.sort((a, b) => {
        const aValue = a[sortField] as string;
        const bValue = b[sortField] as string;

        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    }

    const total = filteredCities.length;
    const start = (query.page - 1) * this.limit;
    const end = start + this.limit;

    return {
      data: filteredCities.slice(start, end) || [],
      total: total || 0,
      page: query.page || 1,
      limit: this.limit,
    };
  }

  getCityById(id: number): City {
    const city = this.cities.find((city) => city.id === id);
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  getRandomCityForGame(): CityGuesserResponse {
    const correctCity =
      this.cities[Math.floor(Math.random() * this.cities.length)];
    const options = [correctCity.name];

    while (options.length < 3) {
      const randomCity =
        this.cities[Math.floor(Math.random() * this.cities.length)];
      if (!options.includes(randomCity.name)) {
        options.push(randomCity.name);
      }
    }

    options.sort(() => Math.random() - 0.5);

    return {
      clues: {
        continent: correctCity.continent,
        population: correctCity.population,
        founded: correctCity.founded,
        landmark: correctCity.landmarks?.[0] || 'No famous landmarks',
      },
      options: options,
      answer: correctCity.name,
    };
  }
}
