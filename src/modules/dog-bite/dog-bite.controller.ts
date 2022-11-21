import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DogBiteService } from './dog-bite.service';
import { CreateDogBiteDto } from './dto/create-dog-bite.dto';
import { UpdateDogBiteDto } from './dto/update-dog-bite.dto';
import { DogBite } from './entities/dog-bite.entity';

@ApiTags('DogBiteController')
@Controller('dog-bite')
export class DogBiteController {
  constructor(private dogBiteService: DogBiteService) {}
  @Post()
  async create(@Body() data: CreateDogBiteDto): Promise<DogBite> {
    return this.dogBiteService.create(data);
  }

  @Get()
  async findAll(): Promise<DogBite[]> {
    return this.dogBiteService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<DogBite> {
    return this.dogBiteService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.dogBiteService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateDogBiteDto,
  ): Promise<void> {
    return this.dogBiteService.update(id, data);
  }
}
