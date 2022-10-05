import { InjectionToken } from '@angular/core';

import { ApiRequest } from './api-request';
import { ApiResponse } from './api-response';

export interface ApiInterceptor {
  request?(request: ApiRequest): ApiRequest;
  response?(response: ApiResponse): ApiResponse;
}

export const API_INTERCEPTOR = new InjectionToken<ApiInterceptor[]>('API_INTERCEPTOR');
