import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  enterSystem() {
    return 'Tizimga xush kelibsiz';
  }
}
