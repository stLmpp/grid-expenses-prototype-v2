import { Injectable } from '@angular/core';
import { isArray, isObject, isString } from 'st-utils';

import { ApiInterceptor } from '../api/api-interceptor';
import { ApiResponse } from '../api/api-response';

@Injectable({ providedIn: 'root' })
export class DateInterceptor implements ApiInterceptor {
  response(response: ApiResponse): ApiResponse {
    return { ...response, data: handleAny(response.data) };
  }
}

const ISO_DATE_REGEXP =
  /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/;

function handleAny(value: any): any {
  if (isArray(value)) {
    value = handleArray(value);
  } else if (isObject(value)) {
    value = handleObject(value);
  } else if (isISODate(value)) {
    value = new Date(value);
  }
  return value;
}

function handleObject(object: any): any {
  return Object.entries(object).reduce(
    (newObject, [key, value]) => ({ ...newObject, [key]: handleAny(value) }),
    {}
  );
}

function handleArray(value: readonly any[]): any[] {
  return value.map((item) => handleAny(item));
}

function isISODate(value: any): boolean {
  return isString(value) && ISO_DATE_REGEXP.test(value);
}
