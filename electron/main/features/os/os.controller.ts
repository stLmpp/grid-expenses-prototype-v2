import { Controller } from '../../api/controller';
import { Method } from '../../api/method';

@Controller('os')
export class OsController {
  @Method('is-mac', {
    summary: 'Check if OS is MacOS',
    okResponse: { data: () => Boolean },
  })
  isMac(): boolean {
    return process.platform === 'darwin';
  }
}
