import { LOCALE_ID, NgModule } from '@angular/core';

import { withDateInterceptor } from './date.interceptor';
import { withIsMacProvider } from './with-is-mac.provider';

@NgModule({
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    withDateInterceptor(),
    withIsMacProvider(),
  ],
})
export class CoreModule {}
