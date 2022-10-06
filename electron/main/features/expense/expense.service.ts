import { Injectable } from '../../di/injectable';

import { ExpenseRepository } from './expense.repository';

@Injectable({ global: true })
export class ExpenseService {
  constructor(private readonly expenseRepository: ExpenseRepository) {}
}
