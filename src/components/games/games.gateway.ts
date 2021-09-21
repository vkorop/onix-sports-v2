import { WsExceptionFilter } from '@filters/ws-exception.filter';
import { Logger, UseFilters } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventEmitter } from 'stream';
import { GameEventDto } from './dto/game-event.dto';
import { GameProcessService } from './game-process.service';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({ transports: ['websocket'] })
export class GamesGateway implements OnGatewayInit {
  constructor(
    private readonly gameProcessService: GameProcessService,
  ) {}

  @WebSocketServer()
  server: Server = new Server();

  private logger: Logger = new Logger(GamesGateway.name);
  private emiter: EventEmitter = new EventEmitter();

  afterInit() {
    this.emiter = this.gameProcessService.Emiter;

    this.emiter.on('finish', this.finish);
  }

  public finish({ id }: any) {
    this.server.emit('finish', { id });
  }

  @SubscribeMessage('start')
  public async start(@MessageBody('id') id: string): Promise<WsResponse> {
    await this.gameProcessService.start(id);

    const data = this.gameProcessService.info(id);

    return { event: 'started', data };
  }

  @SubscribeMessage('goal')
  public goal(@MessageBody() { id, playerId }: GameEventDto): WsResponse {
    const data = this.gameProcessService.goal(id, playerId);

    return { event: 'score', data };
  }

  @SubscribeMessage('pause')
  public async pause(@MessageBody('id') id: string): Promise<WsResponse> {
    const data = await this.gameProcessService.pause(id);

    return { event: 'paused', data };
  }

  @SubscribeMessage('unpause')
  public async unpause(@MessageBody('id') id: string): Promise<WsResponse> {
    const data = await this.gameProcessService.unpause(id);

    return { event: 'paused', data };
  }

  @SubscribeMessage('swap')
  public swap(@MessageBody() { id, playerId }: GameEventDto): WsResponse {
    const data = this.gameProcessService.swap(id, playerId);

    return { event: 'swapped', data };
  }
}
