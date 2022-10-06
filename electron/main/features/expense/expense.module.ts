import { Module } from '../../api/module';

import { ExpenseController } from './expense.controller';

@Module({
  controllers: [ExpenseController],
})
export class ExpenseModule {}
