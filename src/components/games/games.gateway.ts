import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ActionType } from './enum/action-type.enum';
import { GamesService } from './games.service';

@WebSocketGateway({ transports: ['websocket'] })
export class GamesGateway {
  constructor(
    private readonly gameService: GamesService,
  ) {}

  private logger: Logger = new Logger(GamesGateway.name);

  @SubscribeMessage('joinRoom')
  handleJoin(@ConnectedSocket() client: Socket, @MessageBody() { roomId }: any): WsResponse<unknown> {
    this.logger.log(`Client ${client.id} connected to room ${roomId}`);

    client.join(roomId);
    client.broadcast.to(roomId);

    return { event: 'joinedRoom', data: {} };
  }

  @SubscribeMessage('leaveRoom')
  handleLeave(@ConnectedSocket() client: Socket, @MessageBody() { roomId }: any): WsResponse<unknown> {
    this.logger.log(`Client ${client.id} disconnected from room ${roomId}`);

    client.leave(roomId);
    client.broadcast.to(roomId);

    return { event: 'leftRoom', data: {} };
  }

  @SubscribeMessage('startGame')
  async handleStart(@ConnectedSocket() client: Socket, @MessageBody() { roomId }: any): Promise<WsResponse<unknown>> {
    this.logger.log(`Client ${client.id} started game ${roomId}`);

    await this.gameService.startGame(roomId);

    client.to(roomId);

    return { event: 'startedGame', data: {} };
  }

  @SubscribeMessage('goal')
  async handleGoal(
    @ConnectedSocket() client: Socket, 
    @MessageBody() { roomId, playerId }: any): Promise<WsResponse<unknown>> {
    this.logger.log(`Client ${client.id} saved action ${ActionType.MGOAL}`);

    await this.gameService.saveAction(roomId, { actionType: ActionType.MGOAL, playerId });

    client.to(roomId);

    return { event: 'actionSaved', data: {} };
  }

  @SubscribeMessage('finishGame')
  async handleFinish(
    @ConnectedSocket() client: Socket, 
    @MessageBody() { roomId, winner }: any): Promise<WsResponse<unknown>> {
    this.logger.log(`Client ${client.id} finished game ${roomId}`);

    await this.gameService.finishGame(roomId, { winner });

    client.to(roomId);

    return { event: 'finishedGame', data: {} };
  }
}
