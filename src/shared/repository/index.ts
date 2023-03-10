import { Clinic } from '@/shared/entities';
import { Module } from '@nestjs/common';
import { ProviderData } from './providers/index';
import { STATECODE_LIST } from './constants';

@Module({})
export class ClinicRepository {
  readonly repository: Clinic[] = [];

  constructor(private readonly providerData: ProviderData) {
    this.repository = providerData.getProvidersDatabase();
  }

  public async findAll(): Promise<Clinic[]> {
    return this.repository;
  }

  public async findByName(name: string): Promise<Clinic[]> {
    return this.repository.filter((clinic: Clinic) => {
      return clinic.getName() === name;
    });
  }

  public async findByStateName(stateName: string): Promise<Clinic[]> {
    if (stateName.length == 2)
      stateName = STATECODE_LIST[stateName.toUpperCase()];
    return this.repository.filter(
      (clinic: Clinic) => clinic.getStateName() === stateName,
    );
  }

  public async findByAvailabilityFrom(
    availabilityFrom: string,
  ): Promise<Clinic[]> {
    return this.repository.filter(
      (clinic: Clinic) => clinic.getAvailabilityFrom() === availabilityFrom,
    );
  }

  public async findByAvailabilityTo(availabilityTo: string): Promise<Clinic[]> {
    return this.repository.filter(
      (clinic: Clinic) => clinic.getAvailabilityTo() === availabilityTo,
    );
  }
}
