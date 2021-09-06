import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GameSchema } from './schemas/game.schema';
import GamesRepository from './games.repository';
import gamesConstants from './games-constants';
import { GamesGateway } from './games.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: gamesConstants.models.games,
        collection: gamesConstants.models.games,
        schema: GameSchema,
      },
    ]),
  ],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository, GamesGateway],
  exports: [GamesService, GamesRepository],
})
export class GamesModule {}
