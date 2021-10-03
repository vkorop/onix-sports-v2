import { NotificationListener } from "@components/notification/abstract/notification-listener.absctract";
import { NotificationService } from "@components/notification/notification.service";
import { StatisticsService } from "@components/statistics/statistics.service";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ObjectId } from "mongodb";
import { tournamentPerformTemplate } from "./templates/tournament-perform.template";

@Injectable()
export class StatisticListener extends NotificationListener {
  constructor(
    readonly notificationService: NotificationService,

    private readonly statisticService: StatisticsService,
  ) {
    super(notificationService);
  }

  protected bindHandlers() {}

  @OnEvent('tournament.closed')
  async handleCloseTournament({ tournament: { id } }: { tournament: { id: ObjectId } }) {
    const perform = await this.statisticService.getTournamentPerform(id);
    const message = tournamentPerformTemplate(perform);

    this.notificationService.sendToAll(message, { parse_mode: 'HTML' });
  }
}