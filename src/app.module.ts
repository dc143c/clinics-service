import { Module } from '@nestjs/common';
import { ClinicsModule } from '@/domain/clinics';

@Module({
  imports: [ClinicsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
