import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/api/v1/health')
  getHealth(): { status: string } {
    return { status: 'ok' };
  }
}
