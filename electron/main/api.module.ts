import { Module } from './api/module';
import { DocsModule } from './features/docs/docs.module';
import { OsModule } from './features/os/os.module';
import { PingModule } from './features/ping/ping.module';

@Module({
  imports: [DocsModule, PingModule, OsModule],
})
export class ApiModule {}
