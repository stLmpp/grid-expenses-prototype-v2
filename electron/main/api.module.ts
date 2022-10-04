import { Module } from './api/module';
import { DocsModule } from './features/docs/docs.module';

@Module({
  imports: [DocsModule],
})
export class ApiModule {}
