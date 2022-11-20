import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModels } from './database/database.models';
import { HelloWorldModule } from './modules/hello-world/hello-world.module';
import { DatabaseModule } from './database/database.module';
import { DogBiteModule } from './modules/dog-bite/dog-bite.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

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
    DatabaseModule,
    HelloWorldModule,
    DogBiteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
