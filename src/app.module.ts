import { Module } from '@nestjs/common';
import { ClinicsModule } from '@/domain';
import { AppController } from './app.controller';

@Module({
  imports: [ClinicsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
