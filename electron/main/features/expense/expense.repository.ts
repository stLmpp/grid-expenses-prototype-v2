import { Injectable } from '../../di/injectable';

import { PersistDto } from './dto/persist.dto';

@Injectable({ global: true })
export class ExpenseRepository {
  async persistExpenses(year: number, expenses: PersistDto[]): Promise<void> {
    // TODO
    // eslint-disable-next-line no-console
    console.log({ year, expenses });
  }
}
