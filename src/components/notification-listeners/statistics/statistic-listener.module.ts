import { NotificationModule } from "@components/notification/notification.module";
import { StatisticsModule } from "@components/statistics/statistics.module";
import { Module } from "@nestjs/common";
import { StatisticListener } from "./statistic.listener";

@Module({
  imports: [
    StatisticsModule,
    NotificationModule
  ],
  providers: [StatisticListener],
})
export class StatisticListenerModule {}