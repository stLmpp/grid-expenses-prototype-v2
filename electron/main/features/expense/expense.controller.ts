import { Controller } from '../../api/controller';
import { Data } from '../../api/data';
import { Method } from '../../api/method';

import { PersistDto } from './dto/persist.dto';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Method('enqueue')
  enqueue(@Data({ isArray: true, type: PersistDto }) dto: PersistDto[]): void {
    this.expenseService.enqueue(dto);
  }
}
