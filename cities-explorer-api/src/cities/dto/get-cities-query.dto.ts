import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCitiesQueryDto {
  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  continent?: string;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit: number = 10;
}
