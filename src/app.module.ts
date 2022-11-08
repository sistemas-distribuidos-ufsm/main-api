import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModels } from './database/database.models';
import { HelloWorldController } from './modules/hello-world/hello-world.controller';
import { HelloWorldService } from './modules/hello-world/hello-world.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [...DatabaseModels],
    }),
  ],
  controllers: [HelloWorldController],
  providers: [HelloWorldService],
})
export class AppModule {}
