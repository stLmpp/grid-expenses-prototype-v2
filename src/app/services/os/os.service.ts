import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../api/api.service';

@Injectable({ providedIn: 'root' })
export class OsService {
  private readonly _apiService = inject(ApiService);

  private readonly _endPoint = 'os';

  isMac(): Observable<boolean> {
    return this._apiService.request<boolean>(`${this._endPoint}/is-mac`);
  }
}
