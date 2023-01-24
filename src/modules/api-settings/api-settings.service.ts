import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiSettingsService {
  private readonly API_URLS = [
    'http://localhost:3001/api-settings/status',
    'http://localhost:3002/api-settings/status',
    'http://localhost:3003/api-settings/status',
    'http://localhost:3004/api-settings/status',
  ];

  constructor(private readonly httpService: HttpService) {}

  async getStatus(): Promise<any> {
    const responses = [];

    for (const url of this.API_URLS) {
      const request = this.httpService.get(url).pipe(
        map((response) => {
          return {
            api: url,
            status: response?.status,
            data: response?.data,
          };
        }),
      );

      try {
        const response = await lastValueFrom(request);
        responses.push(response);
      } catch (error) {
        responses.push({
          api: url,
          status: 502,
          data: `Unavaiable - ${error.message}`,
        });
      }
    }

    return responses;
  }
}
