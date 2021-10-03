import { NotificationModule } from "@components/notification/notification.module";
import { Module } from "@nestjs/common";
import { TournamentListener } from "./tournament.listener";

@Module({
  imports: [
    NotificationModule
  ],
  providers: [TournamentListener],
})
export class TournamentListenerModule {}