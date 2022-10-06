import { Module } from './api/module';
import { DocsModule } from './features/docs/docs.module';
import { ExpenseController } from './features/expense/expense.controller';
import { OsModule } from './features/os/os.module';
import { PingModule } from './features/ping/ping.module';

@Module({
  imports: [DocsModule, PingModule, OsModule, ExpenseController],
})
export class ApiModule {}
