import { Logger } from '@nestjs/common';
import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventEmitter } from 'stream';
import { GameProcessService } from './game-process.service';

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
  public async start(@MessageBody() { id }: any): Promise<WsResponse> {
    const game = await this.gameProcessService.start(id);

    return { event: 'started', data: game };
  }

  @SubscribeMessage('goal')
  public goal(@MessageBody() { id, playerId }: any) {
    this.gameProcessService.goal(id, playerId);
  }
}
