import { inject, Injectable } from '@angular/core';
import { StatusCodes } from 'http-status-codes';
import { catchError, from, map, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { isNil } from 'st-utils';
import { SetRequired } from 'type-fest';

import { WINDOW } from '../core/window.token';

import { API_INTERCEPTOR, ApiInterceptor } from './api-interceptor';
import { ApiOptions } from './api-options';
import { ApiRequest } from './api-request';
import { ApiResponse } from './api-response';

function isRequestInterceptor(
  element: ApiInterceptor
): element is SetRequired<ApiInterceptor, 'request'> {
  return !!element.request;
}

function isResponseInterceptor(
  element: ApiInterceptor
): element is SetRequired<ApiInterceptor, 'response'> {
  return !!element.response;
}

@Injectable()
export class ApiService {
  private readonly _interceptors = inject(API_INTERCEPTOR);
  private readonly _window = inject(WINDOW);

  private readonly _requestInterceptors = this._interceptors.filter(isRequestInterceptor);
  private readonly _responseInterceptors = this._interceptors.filter(isResponseInterceptor);

  private readonly _apiInternal$ = from(this._window['api-ready']()).pipe(
    map(() => this._window['api-internal']),
    shareReplay()
  );

  request<T = any, D = any>(
    path: string,
    options: ApiOptions & { data?: D; fullResponse: true }
  ): Observable<ApiResponse<T>>;
  request<T = any, D = any>(
    path: string,
    options?: ApiOptions & { data?: D; fullResponse?: false }
  ): Observable<T>;
  request<T = any, D = any>(
    path: string,
    options: ApiOptions & { data?: D } = {}
  ): Observable<T | ApiResponse<T>> {
    let request: ApiRequest = { path, data: options.data ?? {} };
    if (!options.ignoreInterceptors && !options.ignoreRequestInterceptors) {
      request = this._requestInterceptors.reduce((acc, item) => item.request(acc), request);
    }
    return this._apiInternal$.pipe(
      map((apiInternal) => {
        const method = apiInternal[path];
        if (isNil(method)) {
          throw new ApiResponse({
            success: false,
            statusCode: 404,
            message: `Path ${path} not found`,
            data: null,
          });
        }
        return method;
      }),
      switchMap((method) => method(request.data)),
      map((response) => {
        if (!options.ignoreInterceptors && !options.ignoreResponseInterceptors) {
          response = this._responseInterceptors.reduce((acc, item) => item.response(acc), response);
        }
        const newResponse = new ApiResponse(response);
        if (!newResponse.success) {
          throw newResponse;
        }
        if (options.fullResponse) {
          return newResponse;
        }
        return newResponse.data;
      }),
      catchError((error) =>
        throwError(() =>
          error instanceof ApiResponse
            ? error
            : new ApiResponse({
                data: error?.data ?? null,
                message: error?.message ?? 'Could not communicate with back-end',
                statusCode: error?.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
                success: false,
              })
        )
      )
    );
  }
}
