import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { GameProcessService } from './game-process.service';
import { GamesService } from './games.service';

@WebSocketGateway({ transports: ['websocket'] })
export class GamesGateway {
  constructor(
    private readonly gameService: GamesService,
    private readonly gameProcessService: GameProcessService,
  ) {}

  private logger: Logger = new Logger(GamesGateway.name);

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
