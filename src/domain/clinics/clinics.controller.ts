import { Controller, Get, Query } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { Clinic } from '@/shared/entities';
import { analyzeFilterPayload } from '@/shared/helpers';

@Controller('/api/v1/clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  async getFiltered(@Query() filters: any): Promise<Clinic[]> {
    return analyzeFilterPayload(filters, this.clinicsService);
  }
}
