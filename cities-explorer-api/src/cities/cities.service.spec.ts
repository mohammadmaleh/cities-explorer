import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { NotFoundException } from '@nestjs/common';
import { citiesMock } from '../mocks/cities.mock';
import * as fs from 'fs';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';

describe('CitiesService', () => {
  let service: CitiesService;
  const loadCitiesMock = () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify({ cities: citiesMock }));
  };

  const defaultQuery = { page: 1, limit: 10 };

  beforeEach(async () => {
    loadCitiesMock();
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    service['loadCities']();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cities when no filter is applied', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery };

    expect(service.getCities(query)).toEqual(citiesMock);
  });

  it('should filter cities by country', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery, country: 'usa' };

    expect(service.getCities(query)).toEqual([citiesMock[1]]);
  });

  it('should filter cities by continent', () => {
    const query: GetCitiesQueryDto = {
      ...defaultQuery,
      continent: 'Australia',
    };

    expect(service.getCities(query)).toEqual([citiesMock[0]]);
  });

  it('should filter cities by both country and continent', () => {
    const query: GetCitiesQueryDto = {
      ...defaultQuery,
      country: 'spain',
      continent: 'europe',
    };

    expect(service.getCities(query)).toEqual([citiesMock[2]]);
  });

  it('should paginate cities: page 1, limit 2', () => {
    const query: GetCitiesQueryDto = { page: 1, limit: 2 };
    const expected = citiesMock.slice(0, 2);
    expect(service.getCities(query)).toEqual(expected);
  });

  it('should paginate cities: page 2, limit 2', () => {
    const query: GetCitiesQueryDto = { page: 2, limit: 2 };
    const expected = citiesMock.slice(2, 4);
    expect(service.getCities(query)).toEqual(expected);
  });

  it('should sort cities by name ascending', () => {
    const query: GetCitiesQueryDto = { sortBy: 'name:asc', page: 1, limit: 10 };
    const expected = [citiesMock[2], citiesMock[1], citiesMock[0]];
    expect(service.getCities(query)).toEqual(expected);
  });

  it('should sort cities by name descending', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery, sortBy: 'name:desc' };
    const expected = [citiesMock[0], citiesMock[1], citiesMock[2]];
    expect(service.getCities(query)).toEqual(expected);
  });

  it('should return sorted and paginated cities', () => {
    const query: GetCitiesQueryDto = { sortBy: 'name:asc', page: 1, limit: 2 };
    const expected = [citiesMock[2], citiesMock[1]];
    expect(service.getCities(query)).toEqual(expected);
  });

  it('should return city by id', () => {
    expect(service.getCityById(1)).toEqual(citiesMock[0]);
  });

  it('should throw NotFoundException when city is not found', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify({ cities: citiesMock }));

    service['loadCities']();
    expect(() => service.getCityById(999)).toThrow(NotFoundException);
  });
});
