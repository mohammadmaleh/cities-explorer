import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { City } from '../interfaces/city.interface';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getCities(): City[] {
    return this.citiesService.getCities();
  }

  @Get(':id')
  getCityById(@Param('id') id: string): City {
    return this.citiesService.getCityById(Number(id));
  }
}
