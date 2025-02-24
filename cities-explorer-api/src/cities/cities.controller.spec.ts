import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { NotFoundException } from '@nestjs/common';
import { citiesMock } from '../mocks/cities.mock';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';
import { PaginatedResponse } from 'src/interfaces/common.interface';
import { City, CityGuesserResponse } from '../interfaces/city.interface';
import { cityGuesserQuestionMock } from '../../../cities-explorer-frontend/src/app/components/mocks/cities.mocks';

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
            getRandomCityForGame: jest.fn(),
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

  it('should return 10 cities when no query is provided', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery };
    const paginated: PaginatedResponse<City> = {
      data: citiesMock.slice(0, 10),
      total: citiesMock.length,
      page: 1,
      limit: 10,
    };

    (service.getCities as jest.Mock).mockReturnValue(paginated);

    expect(controller.getCities(query)).toEqual(paginated);
  });

  it('should return filtered cities by continent', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery, continent: 'europe' };
    const filtered = citiesMock.filter((city) => city.continent === 'europe');
    const paginated: PaginatedResponse<any> = {
      data: filtered,
      total: citiesMock.length,
      page: 1,
      limit: 10,
    };

    (service.getCities as jest.Mock).mockReturnValue(paginated);

    expect(controller.getCities(query)).toEqual(paginated);
  });

  it('should sort cities by name ascending', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery, sortBy: 'name:asc' };
    const sorted = citiesMock.sort((a, b) => a.name.localeCompare(b.name));
    const paginated: PaginatedResponse<any> = {
      data: sorted,
      total: citiesMock.length,
      page: 1,
      limit: 10,
    };

    (service.getCities as jest.Mock).mockReturnValue(paginated);

    expect(controller.getCities(query)).toEqual(paginated);
  });

  it('should sort cities by name descending', () => {
    const query: GetCitiesQueryDto = { ...defaultQuery, sortBy: 'name:desc' };
    const sorted = [citiesMock[0], citiesMock[1], citiesMock[2]];
    const paginated: PaginatedResponse<any> = {
      data: sorted,
      total: citiesMock.length,
      page: 1,
      limit: 10,
    };

    (service.getCities as jest.Mock).mockReturnValue(paginated);

    expect(controller.getCities(query)).toEqual(paginated);
  });

  it('should paginate cities: page 1, limit 2', () => {
    const query: GetCitiesQueryDto = {
      page: 1,
    };

    const paginated: PaginatedResponse<any> = {
      data: citiesMock.slice(0, 2),
      total: citiesMock.length,
      page: 1,
      limit: 10,
    };
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

  describe('getRandomCityGame', () => {
    it('should return a random city for the game', () => {
      const randomCityResponse: CityGuesserResponse = cityGuesserQuestionMock;
      jest
        .spyOn(service, 'getRandomCityForGame')
        .mockReturnValue(randomCityResponse);

      expect(controller.getRandomCityGame()).toEqual(randomCityResponse);
    });
  });
});
