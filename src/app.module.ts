import { Module } from '@nestjs/common';
import { HelloWorldController } from './modules/hello-world/hello-world.controller';
import { HelloWorldService } from './modules/hello-world/hello-world.service';

@Module({
  imports: [],
  controllers: [HelloWorldController],
  providers: [HelloWorldService],
})
export class AppModule {}
