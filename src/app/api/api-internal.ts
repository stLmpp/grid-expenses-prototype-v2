import { ApiResponse } from './api-response';

export type ApiInternal = Record<string, <T = any, D = any>(data: D) => Promise<ApiResponse<T>>>;
