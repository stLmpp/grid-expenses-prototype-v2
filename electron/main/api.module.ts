import { Module } from './api/module';
import { DocsModule } from './features/docs/docs.module';
import { PingModule } from './features/ping/ping.module';

@Module({
  imports: [DocsModule, PingModule],
})
export class ApiModule {}
