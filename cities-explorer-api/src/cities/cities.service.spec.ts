import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { NotFoundException } from '@nestjs/common';
import { citiesMock } from '../mocks/cities.mock';
import * as fs from 'fs';

describe('CitiesService', () => {
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cities', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify({ cities: citiesMock }));

    service['loadCities']();

    expect(service.getCities()).toEqual(citiesMock);
  });

  it('should throw NotFoundException when city is not found', () => {
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify({ cities: citiesMock }));

    service['loadCities']();
    expect(() => service.getCityById(999)).toThrow(NotFoundException);
  });
});
