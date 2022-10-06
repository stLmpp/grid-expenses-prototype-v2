import { ENVIRONMENT_INITIALIZER, inject, Injectable, Provider } from '@angular/core';
import { auditTime, catchError, concatMap, map, Observable, of, pairwise } from 'rxjs';
import { coerceArray } from 'st-utils';

import { PersistActionEnum } from '../../../../lib/persist-action.enum';
import { ApiService } from '../../api/api.service';
import { ExpensePersist } from '../../models/expense-persist';

import { isExpensesDifferent } from './diff-expenses';
import { ExpenseQuery } from './expense.query';

@Injectable({ providedIn: 'root' })
export class ExpensePersistService {
  private readonly _apiService = inject(ApiService);
  private readonly _expenseQuery = inject(ExpenseQuery);

  private readonly _endPoint = 'expense';

  startWatching(): void {
    this._expenseQuery.allExpense$
      .pipe(
        auditTime(1_000),
        pairwise(),
        map(([oldExpenses, newExpenses]) => {
          const updates: ExpensePersist[] = [];
          const passedExpenses = new Set<string>();
          for (let index = 0; index < oldExpenses.length; index++) {
            const oldExpense = oldExpenses[index];
            const newExpenseIndex = newExpenses.findIndex(
              (expense) => expense.id === oldExpense.id
            );
            if (newExpenseIndex === -1) {
              updates.push({ ...oldExpense, action: PersistActionEnum.Delete, order: 0 });
              continue;
            }
            const newExpense = newExpenses[newExpenseIndex];
            passedExpenses.add(newExpense.id);
            if (newExpenseIndex !== index || isExpensesDifferent(oldExpense, newExpense)) {
              updates.push({
                ...newExpense,
                action: PersistActionEnum.Update,
                order: newExpenseIndex,
              });
            }
          }
          for (let index = 0; index < newExpenses.length; index++) {
            const expense = newExpenses[index];
            if (passedExpenses.has(expense.id)) {
              continue;
            }
            updates.push({ ...expense, action: PersistActionEnum.Update, order: index });
          }
          return updates;
        }),
        concatMap((updates) =>
          this.enqueue(updates).pipe(
            catchError((error) => {
              // TODO better logging
              // eslint-disable-next-line no-console
              console.error({ error });
              return of(null);
            })
          )
        )
      )
      .subscribe();
  }

  enqueue(expenseOrExpenses: ExpensePersist | ExpensePersist[]): Observable<void> {
    return this._apiService.request<void>(`${this._endPoint}/enqueue`, {
      data: coerceArray(expenseOrExpenses),
    });
  }
}

export function withExpensePersist(): Provider {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    useFactory: () => {
      const expensePersistService = inject(ExpensePersistService);
      return () => {
        expensePersistService.startWatching();
      };
    },
    multi: true,
  };
}
