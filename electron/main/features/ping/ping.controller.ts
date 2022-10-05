import { Controller } from '../../api/controller';
import { Method } from '../../api/method';

@Controller('ping', {
  summary: 'Just check if the server is running',
})
export class PingController {
  @Method('', {
    summary: 'Ping the server to check if it is running',
    okResponse: { data: () => String },
  })
  ping(): string {
    return `Ping received at ${new Date().toISOString()}`;
  }
}
