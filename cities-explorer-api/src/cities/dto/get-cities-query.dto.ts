import { IsOptional, IsString } from 'class-validator';

export class GetCitiesQueryDto {
  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  continent?: string;
}
