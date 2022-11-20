import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseProviders } from 'src/database/database.providers';
import { HelloWorld } from './entities/hello-world.entity';
import { HelloWorldController } from './hello-world.controller';
import { HelloWorldService } from './hello-world.service';

@Module({
  imports: [SequelizeModule.forFeature([HelloWorld])],
  providers: [HelloWorldService, ...DatabaseProviders],
  controllers: [HelloWorldController],
})
export class HelloWorldModule {}
