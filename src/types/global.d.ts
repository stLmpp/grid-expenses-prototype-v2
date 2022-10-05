import { ApiInternal } from '../app/api/api-internal';

declare global {
  const ngDevMode: unknown;

  interface Window {
    'api-ready': () => Promise<void>;
    'api-internal': ApiInternal;
  }
}

export {};
