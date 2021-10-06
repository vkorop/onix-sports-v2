import { NotificationListener } from "@components/notification/abstract/notification-listener.absctract";
import { NotificationService } from "@components/notification/notification.service";
import { PuppeteerService } from "@components/puppeteer/puppeteer.service";
import { StatisticsService } from "@components/statistics/statistics.service";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ObjectId } from "mongodb";
import { tournamentPerformTemplate } from "./templates/tournament-perform.template";

@Injectable()
export class StatisticListener extends NotificationListener {
  constructor(
    readonly notificationService: NotificationService,
    
    private readonly puppeteerService: PuppeteerService,
    private readonly statisticService: StatisticsService,
  ) {
    super(notificationService);
  }

  protected bindHandlers() {}

  @OnEvent('tournament.closed')
  async handleCloseTournament({ tournament: { id } }: { tournament: { id: ObjectId } }) {
    const { goals } = await this.statisticService.getTournamentPerform(id);
    const html = tournamentPerformTemplate({ bestPerformer: goals[0] });
    const path = await this.puppeteerService.screenshot(html);

    await this.notificationService.sendPhotoToAll({ source: path });

    this.puppeteerService.removeScreenshots();
  }
}