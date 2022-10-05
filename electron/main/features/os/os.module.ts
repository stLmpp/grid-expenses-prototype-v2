import { Module } from '../../api/module';

import { OsController } from './os.controller';

@Module({
  controllers: [OsController],
})
export class OsModule {}
