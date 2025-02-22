import { Controller, Get, Param, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from '../interfaces/city.interface';
import { GetCitiesQueryDto } from './dto/get-cities-query.dto';
import { PaginatedResponse } from 'src/interfaces/common.interface';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getCities(@Query() query: GetCitiesQueryDto): PaginatedResponse<City> {
    return this.citiesService.getCities(query);
  }

  @Get(':id')
  getCityById(@Param('id') id: string): City {
    return this.citiesService.getCityById(Number(id));
  }
}
