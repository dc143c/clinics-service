import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ClinicsService } from '@/domain/clinics/clinics.service';
import { Clinic } from '@/shared/entities/Clinic';
import { analyzeFilterPayload } from '../src/shared/helpers/index';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const clinicService = {
    getAll: () => Promise<Clinic[]>,
    getFilteredByName: () => Promise<Clinic[]>,
    getFilteredByStateName: () => Promise<Clinic[]>,
    getFilteredByAvailabilityFrom: () => Promise<Clinic[]>,
    getFilteredByAvailabilityTo: () => Promise<Clinic[]>,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ClinicsService)
      .useValue(clinicService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Verify application registered clinics', async () => {
    return await request(app.getHttpServer())
      .get('/api/v1/clinics/')
      .expect(200)
      .expect(async () => {
        await clinicService.getAll();
      });
  });

  it('Verify application registered clinics by name', async () => {
    const filters = { name: 'Mayo Clinic' };
    return await request(app.getHttpServer())
      .get('/api/v1/clinics/')
      .query(filters)
      .expect(200)
      .expect(async () => await analyzeFilterPayload(filters, clinicService));
  });

  it('Verify application registered clinics by state', async () => {
    const filters = { stateName: 'Florida' };
    return await request(app.getHttpServer())
      .get('/api/v1/clinics/')
      .query(filters)
      .expect(200)
      .expect(async () => await analyzeFilterPayload(filters, clinicService));
  });

  it('Verify application registered clinics by abrv. state name', async () => {
    const filters = { stateName: 'FL' };
    return await request(app.getHttpServer())
      .get('/api/v1/clinics/')
      .query(filters)
      .expect(200)
      .expect(async () => await analyzeFilterPayload(filters, clinicService));
  });

  it('Verify application registered clinics by opening time', async () => {
    const filters = { availabilityFrom: '8:00' };
    return await request(app.getHttpServer())
      .get('/api/v1/clinics/')
      .query(filters)
      .expect(200)
      .expect(async () => await analyzeFilterPayload(filters, clinicService));
  });

  it('Verify application registered clinics by closing time', async () => {
    const filters = { availabilityTo: '22:00' };
    return await request(app.getHttpServer())
      .get('/api/v1/clinics/')
      .query(filters)
      .expect(200)
      .expect(async () => await analyzeFilterPayload(filters, clinicService));
  });
});
