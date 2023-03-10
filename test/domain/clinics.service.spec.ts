import { Test } from '@nestjs/testing';
import { ClinicsController } from '@/domain/clinics/clinics.controller';
import { Clinic } from '@/shared/entities';
import { ClinicsService } from '@/domain/clinics/clinics.service';
import { analyzeFilterPayload } from '@/shared/helpers';
import { compareTwoArrays } from '../../src/shared/helpers/index';
import { ProviderData } from '@/shared/repository/providers';
import { ClinicsServiceTest } from './clinics.service';

describe('ClinicsService', () => {
  type ClinicsServiceType = {
    getAll: () => Promise<Clinic[]>;
    getFilteredByName: (name: string) => Promise<Clinic[]>;
    getFilteredByStateName: (stateName: string) => Promise<Clinic[]>;
    getFilteredByAvailabilityFrom: (
      availabilityFrom: string,
    ) => Promise<Clinic[]>;
    getFilteredByAvailabilityTo: (availabilityTo: string) => Promise<Clinic[]>;
  };

  let clinicsService: ClinicsServiceType;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProviderData],
      controllers: [ClinicsController],
      providers: [ClinicsService],
    }).compile();

    expect(moduleRef).toBeDefined();
    clinicsService = new ClinicsServiceTest();
    expect(clinicsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of clinics', async () => {
      const filters = {};
      const result = await clinicsService.getAll();
      const request = await analyzeFilterPayload(filters, clinicsService);

      expect(request).toMatchObject(result);
      expect(request.length).toBe(result.length);
    });
  });

  describe('findAllByName', () => {
    it('should return an array of clinics filtered by name', async () => {
      const filters = { name: 'Mayo Clinic' };
      const result = await clinicsService.getFilteredByName(filters.name);
      const request = await analyzeFilterPayload(filters, clinicsService);

      expect(request).toMatchObject(result);
      expect(request.length).toBe(result.length);
    });
  });

  describe('findAllByStateNameAbrv', () => {
    it('should return an array of clinics filtered by state name', async () => {
      const filters = { stateName: 'Florida' };
      const result = await clinicsService.getFilteredByStateName(
        filters.stateName,
      );
      const request = await analyzeFilterPayload(filters, clinicsService);

      expect(request).toMatchObject(result);
      expect(request.length).toBe(result.length);
    });
  });

  describe('findAllByStateName', () => {
    it('should return an array of clinics filtered by abbreviated state name', async () => {
      const filters = { stateName: 'FL' };
      const result = await clinicsService.getFilteredByStateName(
        filters.stateName,
      );
      const request = await analyzeFilterPayload(filters, clinicsService);

      expect(request).toMatchObject(result);
      expect(request.length).toBe(result.length);
    });
  });

  describe('findAllByAvailabilityFrom', () => {
    it('should return an array of clinics filtered by opening hour', async () => {
      const filters = { availabilityFrom: '09:00' };
      const result = await clinicsService.getFilteredByAvailabilityFrom(
        '09:00',
      );
      const request = await analyzeFilterPayload(filters, clinicsService);

      expect(request).toMatchObject(result);
      expect(request.length).toBe(result.length);
    });
  });

  describe('findAllByStateNameAndAvailabilityFrom', () => {
    it('should return an array of clinics filtered by abbreviated state name and opening hour', async () => {
      const filters = { stateName: 'FL', availabilityFrom: '09:00' };
      const byName = await clinicsService.getFilteredByStateName('FL');
      const byAvailability = await clinicsService.getFilteredByAvailabilityFrom(
        '09:00',
      );
      const result = compareTwoArrays(byName, byAvailability);
      const request = await analyzeFilterPayload(filters, clinicsService);

      expect(request).toMatchObject(result);
      expect(request.length).toBe(result.length);
    });
  });
});
