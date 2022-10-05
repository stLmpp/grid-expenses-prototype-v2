import { Module } from '../../api/module';

import { PingController } from './ping.controller';

@Module({
  controllers: [PingController],
})
export class PingModule {}
