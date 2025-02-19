// src/cities/cities.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { City, CityRaw } from '../interfaces/city.interface';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class CitiesService {
  private cities: City[];

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

  getCities(): City[] {
    return this.cities;
  }

  getCityById(id: number): City {
    const city = this.cities.find((city) => city.id === id);
    if (!city) throw new NotFoundException('City not found');
    return city;
  }
}
