import { WsExceptionFilter } from '@filters/ws-exception.filter';
import { Logger, UseFilters } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { EventEmitter2 } from 'eventemitter2';
import { Server } from 'socket.io';
import { EventEmitter } from 'stream';
import { GameEventDto } from './dto/game-event.dto';
import { GameProcessService } from './game-process.service';

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({ transports: ['websocket'] })
export class GamesGateway implements OnGatewayInit {
  constructor(
    private readonly gameProcessService: GameProcessService,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  @WebSocketServer()
  server: Server = new Server();

  private logger: Logger = new Logger(GamesGateway.name);
  private emiter: EventEmitter = new EventEmitter();

  afterInit() {
    this.emiter = this.gameProcessService.Emiter;

    this.emiter.on('finish', this.finish);
  }

  public finish({ id, info }: any) {
    this.server.emit('finish', { id, info });
  }

  @SubscribeMessage('start')
  public async start(@MessageBody('id') id: string): Promise<WsResponse> {
    await this.gameProcessService.start(id);

    const data = this.gameProcessService.info(id);

    this.server.emit('data', data);
    this.eventEmitter.emit('game.started', { id });

    return { event: 'data', data };
  }

  @SubscribeMessage('goal')
  public goal(@MessageBody() { id, playerId, enemyId }: GameEventDto): WsResponse {
    const data = this.gameProcessService.goal(id, playerId, enemyId);

    this.server.emit('data', data);

    return { event: 'data', data };
  }

  @SubscribeMessage('pause')
  public async pause(@MessageBody('id') id: string): Promise<WsResponse> {
    const data = await this.gameProcessService.pause(id);

    this.server.emit('data', data);

    return { event: 'data', data };
  }

  @SubscribeMessage('cancel')
  public cancel(@MessageBody() { id, actionId }: GameEventDto): WsResponse {
    const data = this.gameProcessService.cancel(id, actionId);

    this.server.emit('data', data);

    return { event: 'data', data };
  }

  @SubscribeMessage('swap')
  public swap(@MessageBody() { id, playerId }: GameEventDto): WsResponse {
    const data = this.gameProcessService.swap(id, playerId);

    this.server.emit('data', data);

    return { event: 'data', data };
  }

  @SubscribeMessage('data')
  public data(@MessageBody('id') id: string): WsResponse {
    const data = this.gameProcessService.info(id);

    return { event: 'data', data };
  }
}
