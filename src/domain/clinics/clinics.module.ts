import { Module } from '@nestjs/common';
import { ClinicsController } from './clinics.controller';
import { ClinicsService } from './clinics.service';

@Module({
  imports: [],
  controllers: [ClinicsController],
  providers: [ClinicsService],
})
export class ClinicsModule {}
