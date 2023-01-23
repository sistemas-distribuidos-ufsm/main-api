import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiSettingsController } from './api-settings.controller';
import { ApiSettingsService } from './api-settings.service';

@Module({
  imports: [HttpModule],
  providers: [ApiSettingsService],
  controllers: [ApiSettingsController],
})
export class ApiSettingsModule {}
