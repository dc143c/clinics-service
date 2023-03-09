import { Clinic } from '@/shared/entities';
import { ClinicRepository } from '@/shared/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClinicsService {
  
  private readonly clinicRepository: ClinicRepository = new ClinicRepository();

  getAll(): Promise<Clinic[]>  {
    return this.clinicRepository.findAll();
  }

  getFilteredByName(name: string): Promise<Clinic[]> {
    return this.clinicRepository.findByName(name);
  }

  getFilteredByStateName(stateName: string): Promise<Clinic[]> {
    return this.clinicRepository.findByStateName(stateName);
  }

  getFilteredByAvailabilityFrom(availabilityFrom: string): Promise<Clinic[]> {
    return this.clinicRepository.findByAvailabilityFrom(availabilityFrom);
  }

  getFilteredByAvailabilityTo(availabilityTo: string): Promise<Clinic[]> {
    return this.clinicRepository.findByAvailabilityTo(availabilityTo);
  }
}
