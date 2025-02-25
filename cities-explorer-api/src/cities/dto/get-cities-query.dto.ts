import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCitiesQueryDto {
  @ApiPropertyOptional({
    description: 'Search term for city name or country',
    example: 'madrid',
  })
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @ApiPropertyOptional({
    description: 'Filter by continent',
    example: 'Europe',
  })
  @IsString()
  @IsOptional()
  continent?: string;

  @ApiPropertyOptional({
    description: 'Sort by field and direction (format: field:asc|desc)',
    example: 'name:asc',
  })
  @IsString()
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsNumber()
  page: number = 1;
}
