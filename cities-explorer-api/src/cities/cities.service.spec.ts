import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { citiesMock } from '../mocks/cities.mock';
import { NotFoundException } from '@nestjs/common';
import { CityGuesserResponse } from '../interfaces/city.interface';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');
jest.mock('path');

describe('CitiesService', () => {
  let service: CitiesService;

  const citiesMockRaw = citiesMock.map(({ id, ...rest }) => {
    console.log(id);
    return rest;
  });

  beforeEach(async () => {
    (fs.readFileSync as jest.Mock).mockReturnValue(
      JSON.stringify({ cities: citiesMockRaw }),
    );
    (path.join as jest.Mock).mockReturnValue('mocked/path');

    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCities', () => {
    it('should return paginated cities with default parameters', () => {
      const query: GetCitiesQueryDto = { page: 1 };
      const result = service.getCities(query);
      expect(result.data.length).toBe(10);
      expect(result.total).toBe(citiesMock.length);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should filter cities by continent', () => {
      const europeCities = citiesMock.filter((c) => c.continent === 'Europe');
      const query: GetCitiesQueryDto = { continent: 'Europe', page: 1 };
      const result = service.getCities(query);
      expect(result.data.length).toBe(europeCities.length);
      expect(result.data.every((c) => c.continent === 'Europe')).toBe(true);
    });

    it('should search cities by name or country', () => {
      const searchTerm = 'lon';
      const query: GetCitiesQueryDto = { searchTerm, page: 1 };
      const result = service.getCities(query);
      expect(
        result.data.some(
          (c) =>
            c.name.toLowerCase().includes(searchTerm) ||
            c.country.toLowerCase().includes(searchTerm),
        ),
      ).toBe(true);
    });

    it('should sort cities by name in ascending order', () => {
      const query: GetCitiesQueryDto = { sortBy: 'name:asc', page: 1 };
      const result = service.getCities(query);
      const sorted = [...result.data].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
      expect(result.data).toEqual(sorted);
    });

    it('should return the correct page', () => {
      const query: GetCitiesQueryDto = { page: 2 };
      const result = service.getCities(query);
      const start = (2 - 1) * 10;
      const end = start + 10;
      const expected = citiesMock.slice(start, end);
      expect(result.data).toEqual(expected);
    });
  });

  describe('getCityById', () => {
    it('should return a city by ID', () => {
      const city = service.getCityById(1);
      expect(city).toEqual(citiesMock[0]);
    });

    it('should throw NotFoundException for invalid ID', () => {
      expect(() => service.getCityById(999)).toThrow(NotFoundException);
    });
  });
  describe('getRandomCityForGame', () => {
    it('should return a valid CityGuesserResponse', () => {
      const result: CityGuesserResponse = service.getRandomCityForGame();
      expect(result).toHaveProperty('clues');
      expect(result).toHaveProperty('options');
      expect(result).toHaveProperty('answer');
      expect(result.options).toHaveLength(3);
      expect(result.options).toContain(result.answer);
      expect(new Set(result.options).size).toBe(3);
    });

    it('clues should match the correct city', () => {
      const result: CityGuesserResponse = service.getRandomCityForGame();
      const correctCity = citiesMock.find((c) => c.name === result.answer);
      expect(correctCity).toBeDefined();
      expect(result.clues.continent).toBe(correctCity?.continent);
      expect(result.clues.population).toBe(correctCity?.population);
      expect(result.clues.founded).toBe(correctCity?.founded);
      if (correctCity?.landmarks && correctCity?.landmarks?.length > 0) {
        expect(result.clues.landmark).toBe(correctCity?.landmarks[0]);
      } else {
        expect(result.clues.landmark).toBe('No famous landmarks');
      }
    });
  });
});
