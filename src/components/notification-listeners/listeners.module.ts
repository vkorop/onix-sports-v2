import { Module } from "@nestjs/common";
import { StatisticListenerModule } from "./statistics/statistic-listener.module";
import { TournamentListenerModule } from "./tournaments/tournament-listener.module";

@Module({
  imports: [
    StatisticListenerModule,
    TournamentListenerModule,
  ],
})
export class ListenersModule {}