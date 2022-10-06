import { auditTime, BehaviorSubject, filter } from 'rxjs';

import { Injectable } from '../../di/injectable';

import { PersistDto } from './dto/persist.dto';
import { ExpenseRepository } from './expense.repository';

@Injectable({ global: true })
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {
    this._init();
  }

  private readonly _queue$ = new BehaviorSubject<PersistDto[]>([]);

  private _init(): void {
    this._queue$
      .pipe(
        filter((items) => !!items.length),
        auditTime(5_000)
      )
      .subscribe(() => {
        this._queue$.next([]);
        // TODO logic to persist
        // TODO create json files per year
      });
  }

  enqueue(dto: PersistDto[]): void {
    this._queue$.next([...this._queue$.value, ...dto]);
  }
}
