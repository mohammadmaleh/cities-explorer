import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { NotFoundException } from '@nestjs/common';
import { citiesMock } from '../mocks/cities.mock';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
          useValue: {
            getCities: jest.fn(),
            getCityById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCities', () => {
    it('should return an array of cities', () => {
      jest.spyOn(service, 'getCities').mockReturnValue(citiesMock);

      expect(controller.getCities()).toEqual(citiesMock);
    });
  });

  describe('getCityById', () => {
    it('should return a single city when found', () => {
      jest.spyOn(service, 'getCityById').mockReturnValue(citiesMock[0]);

      expect(controller.getCityById('1')).toEqual(citiesMock[0]);
    });

    it('should throw NotFoundException when the city is not found', () => {
      jest.spyOn(service, 'getCityById').mockImplementation(() => {
        throw new NotFoundException('City not found');
      });

      expect(() => controller.getCityById('999')).toThrow(NotFoundException);
    });
  });
});
