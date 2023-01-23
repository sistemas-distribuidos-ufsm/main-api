import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiSettingsService {
  private readonly API_URLS = [
    'https://viacep.com.br/ws/97105230/json/',
    'https://viacep.com.br/ws/97105200/json/',
    'https://viacep.com.br/ws/97300000/json/',
  ];

  constructor(private readonly httpService: HttpService) {}

  async getStatus(): Promise<any> {
    try {
      const responses = [];

      for (const url of this.API_URLS) {
        const request = this.httpService.get(url).pipe(
          map((response) => {
            return { status: response?.status, data: response?.data };
          }),
        );

        const response = await lastValueFrom(request);
        responses.push(response);
      }

      return responses;
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
  }
}
