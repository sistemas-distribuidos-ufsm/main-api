import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDogBiteDto } from './dto/create-dog-bite.dto';
import { DogBite } from './entities/dog-bite.entity';

@Injectable()
export class DogBiteService {
  constructor(@InjectModel(DogBite) private dogBiteModel: typeof DogBite) {}

  async create(data: CreateDogBiteDto): Promise<DogBite> {
    try {
      const dogBite = await this.dogBiteModel.create(data);

      return dogBite;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<DogBite[]> {
    try {
      const dogBites = await this.dogBiteModel.findAll();

      return dogBites;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: number): Promise<DogBite> {
    try {
      const dogBite = await this.dogBiteModel.findByPk(id);

      if (!dogBite) {
        throw new NotFoundException('Dog bite not found');
      }

      return dogBite;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<DogBite> {
    try {
      console.log('WIP');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
