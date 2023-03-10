import { analyzeFilterPayload } from '@/shared/helpers/index';
import { Clinic } from '../src/shared/entities/Clinic';
import { ClinicsServiceTest } from './domain/clinics.service';
import { ClinicsController } from '@/domain/clinics/clinics.controller';
import { AppController } from '../src/app.controller';

describe('ClientController (e2e)', () => {
  type AppControlerType = {
    getHealth: () => { status: string };
  };

  let appController: AppControlerType;

  beforeEach(async () => {
    appController = new AppController();
    expect(appController).toBeDefined();
  });

  describe('getApplicationStatus', () => {
    it('Verify application status', async () => {
      expect(appController.getHealth()).toMatchObject({ status: 'ok' });
    });
  });
});
