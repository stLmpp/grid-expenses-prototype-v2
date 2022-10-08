import { readFile } from 'fs/promises';
import { join } from 'path';

import { addMonths, addYears, subYears } from 'date-fns';

import { Expense } from '../../../../lib/expense';
import { Injectable } from '../../di/injectable';
import { pathExists } from '../../util/path-exists';
import { ConfigService } from '../config/config.service';

import { PersistDto } from './dto/persist.dto';

@Injectable({ global: true })
export class ExpenseRepository {
  constructor(private readonly _configService: ConfigService) {}

  private _getMonthPath(year: number, month: number): string {
    return join(this._configService.databasePath, `${year}-${month}.json`);
  }

  private async _getOrCreateMonth(year: number, month: number): Promise<Expense[]> {
    const path = this._getMonthPath(year, month);
    const exists = await pathExists(path);
    if (!exists) {
      return [];
    }
    // TODO error handling
    return JSON.parse(await readFile(path, { encoding: 'utf-8' }));
  }

  async persistExpenses(year: number, expenses: PersistDto[]): Promise<void> {
    // TODO
    // eslint-disable-next-line no-console
    console.log({ year, expenses });
  }

  async getAll(): Promise<Expense[]> {
    const oneYearBefore = subYears(new Date(), 1);
    const oneYearLater = addYears(new Date(), 1);
    let date = new Date(oneYearBefore);
    const promises: Promise<Expense[]>[] = [];
    while (
      date.getFullYear() !== oneYearLater.getFullYear() &&
      date.getMonth() !== oneYearLater.getMonth()
    ) {
      promises.push(this._getOrCreateMonth(date.getFullYear(), date.getMonth() + 1));
      date = addMonths(date, 1);
    }
    const values = await Promise.all(promises);
    return values.flat();
  }
}
