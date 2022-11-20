import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HelloWorld } from './entities/hello-world.entity';

@Injectable()
export class HelloWorldService {
  constructor(
    @InjectModel(HelloWorld) private helloWorldModel: typeof HelloWorld,
  ) {}
  async findAll(): Promise<HelloWorld[]> {
    const helloWorlds = await this.helloWorldModel.findAll();

    return helloWorlds;
  }
}
