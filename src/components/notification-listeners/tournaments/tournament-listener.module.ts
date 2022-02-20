import { NotificationModule } from "@components/notification/notification.module";
import { PuppeteerModule } from "@components/puppeteer/puppeteer.module";
import { StatisticsModule } from "@components/statistics/statistics.module";
import { Module } from "@nestjs/common";
import { TournamentListener } from "./tournament.listener";

@Module({
  imports: [
    StatisticsModule,
    NotificationModule,
    PuppeteerModule,
  ],
  providers: [TournamentListener],
})
export class TournamentListenerModule {}