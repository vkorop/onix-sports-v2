import { NotificationListener } from "@components/notification/abstract/notification-listener.absctract";
import { NotificationService } from "@components/notification/notification.service";
import { StatisticsService } from "@components/statistics/statistics.service";
import { TournamentType } from "@components/tournaments/enum/tour-type.enum";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import _ from "lodash";
import { fourPlayersTemplate } from "./templates/4-players.template";
import { fivePlayersTemplate } from "./templates/5-players.template";
import { sixPlayersTemplate } from "./templates/6-players.template";
import { eightPlayersTemplate } from "./templates/8-players.template";

@Injectable()
export class TournamentListener extends NotificationListener {
  constructor(
    readonly notificationService: NotificationService,
    private readonly statisticService: StatisticsService,
  ) {
    super(notificationService);
  }

  templates: any = {
    [TournamentType.FOUR_PLAYERS]: fourPlayersTemplate,
    [TournamentType.FIVE_PLAYERS]: fivePlayersTemplate,
    [TournamentType.SIX_PLAYERS]: sixPlayersTemplate,
    [TournamentType.EIGHT_PLAYERS]: eightPlayersTemplate,
  }

  bindHandlers() {}

  @OnEvent('tournament.generated')
  async handleTournamentGenerated({ tournament, players, teams } : any) {
    const _teams = await this.statisticService.getTeamsWinChance(teams, 50);
    const message = this.templates[tournament.type](players, _teams);

    this.notificationService.sendToAll(message, { parse_mode: 'HTML' });
  }
}