import { Expense } from '../../../lib/expense';

import { Person } from './person';

export interface Month {
  id: string;
  month: number;
  people: Person[];
  expenses: Expense[];
}
