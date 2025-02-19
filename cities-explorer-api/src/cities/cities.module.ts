import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  imports: [],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
