import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { tap } from 'rxjs';

import { OsService } from '../services/os/os.service';
import { ShortcutService } from '../services/shortcut/shortcut.service';

export function withIsMacProvider(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: () => {
      const osService = inject(OsService);
      const shortcutService = inject(ShortcutService);
      return () =>
        osService.isMac().pipe(
          tap((isMac) => {
            shortcutService.setIsMac(isMac);
          })
        );
    },
    multi: true,
  };
}
