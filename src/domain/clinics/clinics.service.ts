import { Clinic } from '@/shared/entities';
import { ClinicRepository } from '@/shared/repository';
import { ProviderData } from '@/shared/repository/providers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClinicsService {
  clinicRepository: ClinicRepository;

  constructor() {
    this.clinicRepository = new ClinicRepository(new ProviderData());
  }

  public getAll(): Promise<Clinic[]> {
    return this.clinicRepository.findAll();
  }

  public getFilteredByName(name: string): Promise<Clinic[]> {
    return this.clinicRepository.findByName(name);
  }

  public getFilteredByStateName(stateName: string): Promise<Clinic[]> {
    return this.clinicRepository.findByStateName(stateName);
  }

  public getFilteredByAvailabilityFrom(
    availabilityFrom: string,
  ): Promise<Clinic[]> {
    return this.clinicRepository.findByAvailabilityFrom(availabilityFrom);
  }

  public getFilteredByAvailabilityTo(
    availabilityTo: string,
  ): Promise<Clinic[]> {
    return this.clinicRepository.findByAvailabilityTo(availabilityTo);
  }
}
