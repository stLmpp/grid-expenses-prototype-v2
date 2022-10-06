import { Controller } from '../../api/controller';

import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  // @Method('persist')
  // persist(@Data({ isArray: true }) dto: PersistDto): void {}
}
