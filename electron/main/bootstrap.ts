import { Class } from 'type-fest';

import { Api } from './api/api';
import { Provider } from './di/provider';

export async function bootstrap(module: Class<any>, providers?: Provider[]): Promise<Api> {
  return Api.create(module, providers).init();
}
