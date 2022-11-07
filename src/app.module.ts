import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloWorldController } from './modules/hello-world/hello-world.controller';
import { HelloWorldService } from './modules/hello-world/hello-world.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  controllers: [HelloWorldController],
  providers: [HelloWorldService],
})
export class AppModule {}
