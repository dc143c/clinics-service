import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
import { ClinicRepository } from '@/shared/repository';

@Module({
  imports: [],
  controllers: [ClinicsController],
  providers: [ClinicsService],
})
export class ClinicsModule {}
