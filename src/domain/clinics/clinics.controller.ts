import { Controller, Get, Query } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { Clinic } from '@/shared/entities';
import { compareTwoArrays } from '@/shared/helpers';

@Controller()
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  async getFiltered(@Query() filters: any): Promise<Clinic[]> {
    let results: Clinic[] = [];
    let filtered: Clinic[] = [];

    if(filters.name) {
      filtered = await this.clinicsService.getFilteredByName(filters.name);
      results = compareTwoArrays(filtered, results)
    }

    if(filters.stateName) {
      filtered = await this.clinicsService.getFilteredByStateName(filters.stateName);
      results = compareTwoArrays(filtered, results)
    }

    if(filters.availabilityFrom) {
      filtered = await this.clinicsService.getFilteredByAvailabilityFrom(filters.availabilityFrom);
      results = compareTwoArrays(filtered, results)
    }

    if(filters.availabilityTo) {
      filtered = await this.clinicsService.getFilteredByAvailabilityTo(filters.availabilityTo);
      results = compareTwoArrays(filtered, results)
    }

    if(!filters.name && !filters.stateName && !filters.availabilityFrom && !filters.availabilityTo) {
      filtered = await this.clinicsService.getAll();
      results = compareTwoArrays(filtered, results)
    }

    return results;
  }
}
