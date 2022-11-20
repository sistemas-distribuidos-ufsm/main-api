import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DogBiteService } from './dog-bite.service';
import { CreateDogBiteDto } from './dto/create-dog-bite.dto';
import { DogBite } from './entities/dog-bite.entity';

@Controller('dog-bite')
export class DogBiteController {
  constructor(private dogBiteService: DogBiteService) {}
  @Post()
  async create(data: CreateDogBiteDto): Promise<DogBite> {
    return this.dogBiteService.create(data);
  }

  @Get()
  async findAll(): Promise<DogBite[]> {
    return this.dogBiteService.findAll();
  }

  @Get(':dogBiteId')
  async findById(@Param('dogBiteId') dogBiteId: number): Promise<DogBite> {
    return this.dogBiteService.findById(dogBiteId);
  }

  @Delete(':dogBiteId')
  async delete(@Param('dogBiteId') dogBiteId: number): Promise<DogBite> {
    return this.dogBiteService.delete(dogBiteId);
  }
}
