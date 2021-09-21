import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './schemas/game.schema';
import GamesRepository from './games.repository';
import gamesConstants from './games-constants';
import { GamesGateway } from './games.gateway';
import { GameProcessService } from './game-process.service';
import { StatisticsModule } from '@components/statistics/statistics.module';
import { GamesGatewayDoc } from './games.gateway.doc';
import { ActionModule } from '@components/action/action.module';

@Module({
  imports: [
    StatisticsModule,
    ActionModule,
    MongooseModule.forFeature([
      {
        name: gamesConstants.models.games,
        collection: gamesConstants.models.games,
        schema: GameSchema,
      },
    ]),
  ],
  controllers: [GamesController, GamesGatewayDoc],
  providers: [GamesService, GamesRepository, GamesGateway, GameProcessService],
  exports: [GamesService, GamesRepository],
})
export class GamesModule {}
