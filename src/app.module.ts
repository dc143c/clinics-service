import { Module } from '@nestjs/common';
import { ClinicsModule } from '@/domain';

@Module({
  imports: [ClinicsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
