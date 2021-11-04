import { ArgumentsHost, Catch, Logger } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  logger: Logger = new Logger(WsExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception.message);
    console.log(exception);
    
    super.catch(exception, host);
  }
}