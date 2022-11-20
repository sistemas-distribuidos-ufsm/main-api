import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DogBiteController } from './dog-bite.controller';
import { DogBiteService } from './dog-bite.service';
import { DogBite } from './entities/dog-bite.entity';

@Module({
  imports: [SequelizeModule.forFeature([DogBite])],
  providers: [DogBiteService],
  controllers: [DogBiteController],
})
export class DogBiteModule {}
