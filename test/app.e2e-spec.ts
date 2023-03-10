import { INestApplication } from '@nestjs/common';
import { Clinic } from '../src/shared/entities/Clinic';
import { Test } from '@nestjs/testing';
import { ClinicsServiceTest } from './domain/clinics.service';
import * as request from 'supertest';
import { ClinicsService } from '../src/domain/clinics/clinics.service';
import { ProviderData } from '@/shared/repository/providers';
import { ClinicsController } from '@/domain/clinics/clinics.controller';

describe('AppController', () => {
  let app: INestApplication;

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
    clinicService = new ClinicsServiceTest();

    const moduleRef = await Test.createTestingModule({
      imports: [ProviderData],
      controllers: [ClinicsController],
      providers: [ClinicsService],
    })
      .overrideProvider(ClinicsService)
      .useValue(clinicService)
      .compile();

    app = moduleRef.createNestApplication();
    expect(clinicService).toBeDefined();
    await app.init();
  });

  describe('/ [GET]', () => {
    it('Verify application registered clinics', async () => {
      const response = await appController.getFiltered({});
      const req = await request(app.getHttpServer()).get('/api/v1/clinics/');
      expect(req.body).toMatchObject(response);
      expect(req.status).toBe(200);
      return;
    });
  });

  describe('/ [GET]', () => {
    it('Verify application registered clinics by name', async () => {
      const filters = { name: 'Mayo Clinic' };
      const response = await appController.getFiltered(filters);
      const req = await request(app.getHttpServer())
        .get('/api/v1/clinics/')
        .query(filters);
      expect(req.body).toMatchObject(response);
      expect(req.status).toBe(200);
      return;
    });
  });

  describe('/ [GET]', () => {
    it('Verify application registered clinics by state', async () => {
      const filters = { stateName: 'Florida' };
      const response = await appController.getFiltered(filters);
      const req = await request(app.getHttpServer())
        .get('/api/v1/clinics/')
        .query(filters);
      expect(req.body).toMatchObject(response);
      expect(req.status).toBe(200);
      return;
    });
  });

  describe('/ [GET]', () => {
    it('Verify application registered clinics by state abreviation', async () => {
      const filters = { stateName: 'FL' };
      const response = await appController.getFiltered(filters);
      const req = await request(app.getHttpServer())
        .get('/api/v1/clinics/')
        .query(filters);
      expect(req.body).toMatchObject(response);
      expect(req.status).toBe(200);
      return;
    });
  });

  describe('/ [GET]', () => {
    it('Verify application registered clinics by opening time', async () => {
      const filters = { availabilityFrom: '8:00' };
      const response = await appController.getFiltered(filters);
      const req = await request(app.getHttpServer())
        .get('/api/v1/clinics/')
        .query(filters);
      expect(req.body).toMatchObject(response);
      expect(req.status).toBe(200);
      return;
    });
  });

  describe('/ [GET]', () => {
    it('Verify application registered clinics by closing time', async () => {
      const filters = { availabilityTo: '22:00' };
      const response = await appController.getFiltered(filters);
      const req = await request(app.getHttpServer())
        .get('/api/v1/clinics/')
        .query(filters);
      expect(req.body).toMatchObject(response);
      expect(req.status).toBe(200);
      return;
    });
  });

  describe('/ [GET]', () => {
    it('Verify application registered clinics by closing time and state name', async () => {
      const filters = { availabilityFrom: '15:00', stateName: 'Florida' };
      const response = await appController.getFiltered(filters);
      const req = await request(app.getHttpServer())
        .get('/api/v1/clinics/')
        .query(filters);
      expect(req.body).toMatchObject(response);
      expect(req.status).toBe(200);
      return;
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
