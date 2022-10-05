import { LOCALE_ID, NgModule } from '@angular/core';

import { API_INTERCEPTOR } from '../api/api-interceptor';

import { DateInterceptor } from './date.interceptor';

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: API_INTERCEPTOR, useExisting: DateInterceptor, multi: true },
  ],
})
export class CoreModule {}
