import { ErrorHandler, Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../../environments/environment';

interface Params {
  [key: string]: string;
}

interface GetOptions {
  url: string;
  params?: Params;
}

interface ErrorResponse {
  id: string;
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;

    this.axiosClient = axios.create({
      baseURL: environment.apiBaseUrl,
      timeout: 1000,
    });
  }

  public async get<T>(options: GetOptions): Promise<T> {
    try {
      const axiosResponse = await this.axiosClient.request<T>({
        method: 'GET',
        url: options.url,
        params: options.params,
      });
      return axiosResponse.data;
    } catch (error) {
      return Promise.reject(this.normalizeError(error));
    }
  }

  private normalizeError(error: unknown): ErrorResponse {
    this.errorHandler.handleError(error);
    return {
      id: '-1',
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
    };
  }
}
