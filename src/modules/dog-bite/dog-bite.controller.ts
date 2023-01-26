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
import { CompleteDogBiteDto } from './dto/complete-dog-bite.dto';
import { CreateDogBiteDto } from './dto/create-dog-bite.dto';
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
    console.log(
      `[LOGGER] TYPE: GET | METHOD: FIND-BY-ID | CONTROLLER: DOG-BITE`,
    );

    return await this.dogBiteService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    console.log(
      `[LOGGER] TYPE: DELETE | METHOD: DELETE | CONTROLLER: DOG-BITE`,
    );

    return await this.dogBiteService.delete(id);
  }

  @Put()
  async update(@Body() data: CompleteDogBiteDto): Promise<void> {
    console.log(`[LOGGER] TYPE: PUT | METHOD: UPDATE | CONTROLLER: DOG-BITE`);

    return await this.dogBiteService.update(data);
  }
}
