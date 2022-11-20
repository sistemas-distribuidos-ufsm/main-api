import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HelloWorld } from './entities/hello-world.entity';
import { HelloWorldService } from './hello-world.service';

@ApiTags('HelloWorldController')
@Controller('hello-world')
export class HelloWorldController {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get()
  async findAll(): Promise<HelloWorld[]> {
    return this.helloWorldService.findAll();
  }
}
