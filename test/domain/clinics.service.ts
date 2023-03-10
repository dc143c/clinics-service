import { ClinicsService } from '@/domain/clinics/clinics.service';
import { ClinicRepository } from '@/shared/repository';
import { ProviderDataTest } from '../shared/repository/mockup.data';

export class ClinicsServiceTest extends ClinicsService {
  constructor() {
    super();
    this.clinicRepository = new ClinicRepository(new ProviderDataTest());
  }
}
