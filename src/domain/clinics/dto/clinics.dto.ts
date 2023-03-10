import { IsOptional, IsString } from 'class-validator';

export class SearchClinicDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  stateName?: string;

  @IsString()
  @IsOptional()
  availabilityFrom?: string;

  @IsString()
  @IsOptional()
  availabilityTo?: string;
}
