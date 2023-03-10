import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';
import { ProviderData } from '@/shared/repository/providers';

@Module({
  imports: [ProviderData],
  controllers: [ClinicsController],
  providers: [ClinicsService],
})
export class ClinicsModule {}
