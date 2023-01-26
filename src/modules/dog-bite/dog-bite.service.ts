import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { map } from 'rxjs/operators';
import { FiltersDto } from '../utils/filters.dto';
import { CompleteDogBiteDto } from './dto/complete-dog-bite.dto';
import { CreateDogBiteDto } from './dto/create-dog-bite.dto';
import { DogBite } from './entities/dog-bite.entity';

@Injectable()
export class DogBiteService {
  private currentApiIndex: number = 0;
  private HTTP_STATUS_OK: number = 200;
  private HTTP_STATUS_CREATED: number = 201;
  private HTTP_STATUS_BAD_REQUEST: number = 400;
  private MAX_RETRIES: number = 4;
  private TIME_BETWEEN_FAIL: number = 3000;
  private MAXIMUM_RETRIES_MESSAGE: string = 'Maximum retries achieved';
  private readonly apiList: string[] = [
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
  ];

  constructor(
    private readonly httpService: HttpService,
    @InjectModel(DogBite) private dogBiteModel: typeof DogBite,
  ) {}

  async create(data: CreateDogBiteDto): Promise<any> {
    let request = null;
    let apiUrl: string = null;
    let isDone: boolean = false;
    let retries: number = 0;

    while (!isDone) {
      if (retries === this.MAX_RETRIES) {
        throw new HttpException(
          {
            message: this.MAXIMUM_RETRIES_MESSAGE,
            status: this.HTTP_STATUS_BAD_REQUEST,
          },
          this.HTTP_STATUS_BAD_REQUEST,
        );
      }

      apiUrl = `${this.updateQueue()}/dog-bite`;
      request = await this.createDogBite(data, apiUrl);

      if (request?.status === this.HTTP_STATUS_CREATED) {
        isDone = true;
      } else {
        retries += 1;
        await new Promise((resolve) =>
          setTimeout(resolve, this.TIME_BETWEEN_FAIL),
        );
      }
    }

    return request;
  }

  async findAll(filters: FiltersDto): Promise<any> {
    let request = null;
    let apiUrl: string = null;
    let isDone: boolean = false;
    let retries: number = 0;

    while (!isDone) {
      if (retries === this.MAX_RETRIES) {
        throw new HttpException(
          {
            message: this.MAXIMUM_RETRIES_MESSAGE,
            status: this.HTTP_STATUS_BAD_REQUEST,
          },
          this.HTTP_STATUS_BAD_REQUEST,
        );
      }

      apiUrl = `${this.updateQueue()}/dog-bite`;
      request = await this.findAllDogBites(filters, apiUrl);

      if (request?.status === this.HTTP_STATUS_OK) {
        isDone = true;
      } else {
        retries += 1;
        await new Promise((resolve) =>
          setTimeout(resolve, this.TIME_BETWEEN_FAIL),
        );
      }
    }

    return request;
  }

  async findById(id: number): Promise<DogBite> {
    let request = null;
    let apiUrl: string = null;
    let isDone: boolean = false;
    let retries: number = 0;

    while (!isDone) {
      if (retries === this.MAX_RETRIES) {
        throw new HttpException(
          {
            message: this.MAXIMUM_RETRIES_MESSAGE,
            status: this.HTTP_STATUS_BAD_REQUEST,
          },
          this.HTTP_STATUS_BAD_REQUEST,
        );
      }

      apiUrl = `${this.updateQueue()}/dog-bite/${id}`;
      request = await this.findDogBite(apiUrl);

      if (request?.status === this.HTTP_STATUS_OK) {
        isDone = true;
      } else {
        retries += 1;
        await new Promise((resolve) =>
          setTimeout(resolve, this.TIME_BETWEEN_FAIL),
        );
      }
    }

    return request;
  }

  async delete(id: number): Promise<void> {
    let request = null;
    let apiUrl: string = null;
    let isDone: boolean = false;
    let retries: number = 0;

    while (!isDone) {
      if (retries === this.MAX_RETRIES) {
        throw new HttpException(
          {
            message: this.MAXIMUM_RETRIES_MESSAGE,
            status: this.HTTP_STATUS_BAD_REQUEST,
          },
          this.HTTP_STATUS_BAD_REQUEST,
        );
      }

      apiUrl = `${this.updateQueue()}/dog-bite/${id}`;
      request = await this.deleteDogBite(apiUrl);

      if (request?.status === this.HTTP_STATUS_OK) {
        isDone = true;
      } else {
        retries += 1;
        await new Promise((resolve) =>
          setTimeout(resolve, this.TIME_BETWEEN_FAIL),
        );
      }
    }

    return request;
  }

  async update(data: CompleteDogBiteDto): Promise<void> {
    let request = null;
    let apiUrl: string = null;
    let isDone: boolean = false;
    let retries: number = 0;

    while (!isDone) {
      if (retries === this.MAX_RETRIES) {
        throw new HttpException(
          {
            message: this.MAXIMUM_RETRIES_MESSAGE,
            status: this.HTTP_STATUS_BAD_REQUEST,
          },
          this.HTTP_STATUS_BAD_REQUEST,
        );
      }

      apiUrl = `${this.updateQueue()}/dog-bite`;
      request = await this.updateDogBite(data, apiUrl);

      if (request?.status === this.HTTP_STATUS_OK) {
        isDone = true;
      } else {
        retries += 1;
        await new Promise((resolve) =>
          setTimeout(resolve, this.TIME_BETWEEN_FAIL),
        );
      }
    }

    return request;
  }

  private updateQueue(): string {
    const apiUrl = this.apiList[this.currentApiIndex];
    this.currentApiIndex = (this.currentApiIndex + 1) % this.apiList.length;

    return apiUrl;
  }

  private async createDogBite(
    data: CreateDogBiteDto,
    url: string,
  ): Promise<any> {
    console.log(`URL: ${url}`);

    const request = this.httpService.post(url, data).pipe(
      map((response) => {
        return {
          status: response?.status,
          data: response?.data,
        };
      }),
    );

    try {
      const response = await request.toPromise();

      return response;
    } catch (error) {
      return {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      };
    }
  }

  private async findAllDogBites(
    filters: FiltersDto,
    url: string,
  ): Promise<any> {
    console.log(`URL: ${url}`);

    const headers = {
      limit: filters.limit,
      offset: filters.offset,
    };

    const request = this.httpService.get(url, { headers }).pipe(
      map((response) => {
        return {
          status: response?.status,
          data: response?.data,
        };
      }),
    );

    try {
      const response = await request.toPromise();

      return response;
    } catch (error) {
      return {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      };
    }
  }

  private async findDogBite(url: string): Promise<any> {
    console.log(`URL: ${url}`);

    const request = this.httpService.get(url).pipe(
      map((response) => {
        return {
          status: response?.status,
          data: response?.data,
        };
      }),
    );

    try {
      const response = await request.toPromise();

      return response;
    } catch (error) {
      return {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      };
    }
  }

  private async deleteDogBite(url: string): Promise<any> {
    console.log(`URL: ${url}`);

    const request = this.httpService.delete(url).pipe(
      map((response) => {
        return {
          status: response?.status,
          data: response?.data,
        };
      }),
    );

    try {
      const response = await request.toPromise();

      return response;
    } catch (error) {
      return {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      };
    }
  }
  
  private async updateDogBite(
    data: CompleteDogBiteDto,
    url: string,
  ): Promise<any> {
    console.log(`URL: ${url}`);

    const request = this.httpService.put(url, data).pipe(
      map((response) => {
        return {
          status: response?.status,
          data: response?.data,
        };
      }),
    );

    try {
      const response = await request.toPromise();

      return response;
    } catch (error) {
      return {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      };
    }
  }
}
