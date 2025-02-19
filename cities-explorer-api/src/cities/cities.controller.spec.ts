import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { NotFoundException } from '@nestjs/common';
import { citiesMock } from '../mocks/cities.mock';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;
  const defaultQuery = { page: 1, limit: 10 };

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

  it('should return all cities when no query is provided', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery };

    (service.getCities as jest.Mock).mockReturnValue(citiesMock);

    expect(controller.getCities(query)).toEqual(citiesMock);
  });

  it('should return filtered cities by continent', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery, continent: 'europe' };
    const filtered = [citiesMock[2]];

    (service.getCities as jest.Mock).mockReturnValue(filtered);

    expect(controller.getCities(query)).toEqual(filtered);
  });

  it('should sort cities by name ascending', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery, sortBy: 'name:asc' };
    const sorted = [citiesMock[2], citiesMock[1], citiesMock[0]];

    (service.getCities as jest.Mock).mockReturnValue(sorted);

    expect(controller.getCities(query)).toEqual(sorted);
  });

  it('should sort cities by name descending', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery, sortBy: 'name:desc' };
    const sorted = [citiesMock[0], citiesMock[1], citiesMock[2]];

    (service.getCities as jest.Mock).mockReturnValue(sorted);

    expect(controller.getCities(query)).toEqual(sorted);
  });
  it('should paginate cities: page 1, limit 2', () => {
    const query: GetCitiesQueryDto = { page: 1, limit: 2 };
    const paginated = citiesMock.slice(0, 2);
    (service.getCities as jest.Mock).mockReturnValue(paginated);
    expect(controller.getCities(query)).toEqual(paginated);
  });

  it('should paginate cities: page 2, limit 2', () => {
    const query: GetCitiesQueryDto = { page: 2, limit: 2 };
    const paginated = citiesMock.slice(2, 4);
    (service.getCities as jest.Mock).mockReturnValue(paginated);
    expect(controller.getCities(query)).toEqual(paginated);
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
