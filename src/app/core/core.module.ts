import { LOCALE_ID, NgModule } from '@angular/core';

import { withExpensePersist } from '../services/expense/expense-persist.service';

import { withDateInterceptor } from './date.interceptor';
import { withIsMacProvider } from './with-is-mac.provider';

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    withDateInterceptor(),
    withIsMacProvider(),
    withExpensePersist(),
  ],
})
export class CoreModule {}
