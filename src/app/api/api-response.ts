import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export interface ApiResponseArgs<T = any> {
  statusCode: StatusCodes;
  success: boolean;
  message?: string | null;
  data?: T | null;
}

export class ApiResponse<T = any> implements ApiResponseArgs {
  constructor({ statusCode, success, message, data }: ApiResponseArgs) {
    this.statusCode = statusCode;
    this.success = success;
    this.message = message;
    this.data = data;
    this.status = getReasonPhrase(statusCode);
  }

  readonly status: string;
  readonly statusCode: StatusCodes;
  readonly success: boolean;
  readonly message?: string | null;
  readonly data?: T | null;
}
