import { Module } from './api/module';
import { DocsModule } from './features/docs/docs.module';
import { ExpenseModule } from './features/expense/expense.module';
import { OsModule } from './features/os/os.module';
import { PingModule } from './features/ping/ping.module';

@Module({
  imports: [DocsModule, PingModule, OsModule, ExpenseModule],
})
export class ApiModule {}
