import { GamesService } from "@components/games/games.service";
import { NotificationListener } from "@components/notification/abstract/notification-listener.absctract";
import { NotificationService } from "@components/notification/notification.service";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ObjectId } from 'mongodb';
import { gameStartedTemplate } from "./templates/game-started.template";

@Injectable()
export class GameListener extends NotificationListener {
  constructor(
    readonly notificationService: NotificationService,
    
    private readonly gameService: GamesService,
  ) {
    super(notificationService);
  }

  protected bindHandlers() {}

  @OnEvent('game.started')
  async handleGameStart({ id }: { id: string }) {
    const { players, _id } = await this.gameService.getGameInfo(new ObjectId(id));

    this.notificationService.sendToAll(...gameStartedTemplate({ players, _id }));
  }
}