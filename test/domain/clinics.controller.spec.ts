import { analyzeFilterPayload } from '@/shared/helpers/index';
import { ClinicsController } from '@/domain/clinics/clinics.controller';
import { Clinic } from '@/shared/entities';
import { ClinicsServiceTest } from './clinics.service';

describe('ClientController (e2e)', () => {
  type ClinicsControllerType = {
    getFiltered: (filters: any) => Promise<Clinic[]>;
  };

  let appController: ClinicsControllerType;

  type ClinicsServiceType = {
    getAll: () => Promise<Clinic[]>;
    getFilteredByName: (name: string) => Promise<Clinic[]>;
    getFilteredByStateName: (stateName: string) => Promise<Clinic[]>;
    getFilteredByAvailabilityFrom: (
      availabilityFrom: string,
    ) => Promise<Clinic[]>;
    getFilteredByAvailabilityTo: (availabilityTo: string) => Promise<Clinic[]>;
  };

  let clinicService: ClinicsServiceType;

  beforeEach(async () => {
    appController = new ClinicsController(new ClinicsServiceTest());
    expect(appController).toBeDefined();
    clinicService = new ClinicsServiceTest();
    expect(clinicService).toBeDefined();
  });

  describe('findAll', () => {
    it('Verify application registered clinics', async () => {
      const filters = {};
      const result = await clinicService.getAll();
      const request = await appController.getFiltered(filters);

      expect(request).toMatchObject(result);
    });
  });

  describe('findFilteredByName', () => {
    it('Verify application registered clinics by name', async () => {
      const filters = { name: 'Mayo Clinic' };
      const result = await clinicService.getFilteredByName(filters.name);
      const request = await appController.getFiltered(filters);

      expect(request).toMatchObject(result);
    });
  });

  describe('findFilteredByStateName', () => {
    it('Verify application registered clinics by state', async () => {
      const filters = { stateName: 'Florida' };
      const result = await clinicService.getFilteredByStateName(
        filters.stateName,
      );
      const request = await appController.getFiltered(filters);

      expect(request).toMatchObject(result);
    });
  });

  describe('findFilteredByStateNameAbrv', () => {
    it('Verify application registered clinics by state abreviation', async () => {
      const filters = { stateName: 'FL' };
      const result = await clinicService.getFilteredByStateName(
        filters.stateName,
      );
      const request = await appController.getFiltered(filters);

      expect(request).toMatchObject(result);
    });
  });

  describe('findFilteredByOpeningTime', () => {
    it('Verify application registered clinics by opening time', async () => {
      const filters = { availabilityFrom: '8:00' };
      const result = await clinicService.getFilteredByAvailabilityFrom(
        filters.availabilityFrom,
      );
      const request = await appController.getFiltered(filters);

      expect(request).toMatchObject(result);
    });
  });

  describe('findFilteredByClosingTime', () => {
    it('Verify application registered clinics by closing time', async () => {
      const filters = { availabilityTo: '22:00' };
      const result = await clinicService.getFilteredByAvailabilityTo(
        filters.availabilityTo,
      );
      const request = await appController.getFiltered(filters);

      expect(request).toMatchObject(result);
    });
  });

  describe('findFilteredByClosingTimeAndStateName', () => {
    it('Verify application registered clinics by closing time and state name', async () => {
      const filters = { availabilityFrom: '15:00', stateName: 'Florida' };
      const result = await analyzeFilterPayload(filters, clinicService);
      const request = await appController.getFiltered(filters);

      expect(request).toMatchObject(result);
    });
  });
});
