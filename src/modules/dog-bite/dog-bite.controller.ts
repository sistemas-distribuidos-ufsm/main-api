import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Headers,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FiltersDto } from '../utils/filters.dto';
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
    console.log(`[LOGGER] TYPE: POST | METHOD: CREATE | CONTROLLER: DOG-BITE`);

    return await this.dogBiteService.create(data);
  }

  @Get()
  async findAll(@Headers() filters: FiltersDto): Promise<DogBite[]> {
    console.log(`[LOGGER] TYPE: GET | METHOD: FIND-ALL | CONTROLLER: DOG-BITE`);

    return await this.dogBiteService.findAll(filters);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<DogBite> {
    console.log(`[LOGGER] TYPE: GET | METHOD: FIND-BY-ID | CONTROLLER: DOG-BITE`);

    return await this.dogBiteService.findById(id);
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
