import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiSettingsService } from './api-settings.service';

@ApiTags('ApiSettingsController')
@Controller('api-settings')
export class ApiSettingsController {
  constructor(private readonly apiSettingsService: ApiSettingsService) {}

  @Get('check-status')
  async checkStatus(): Promise<any> {
    return this.apiSettingsService.getStatus();
  }
}
