import { Module } from "@nestjs/common";
import { StatisticListenerModule } from "./statistics/statistic-listener.module";

@Module({
  imports: [
    StatisticListenerModule,
  ],
})
export class ListenersModule {}