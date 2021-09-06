import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import statisticsConstants from './games-constants';
import { GameEntity } from './schemas/game.schema';
import CreateGameDto from './dto/create-game.dto';
import { Winner } from './enum/winner.enum';


@Injectable()
export default class GamesRepository {
  constructor(
    @InjectModel(statisticsConstants.models.games) 
    private readonly gameModel: Model<GameEntity>
  ) {}

  create(games: CreateGameDto[]) {
    return this.gameModel.create(games);
  }

  updateByRoom(roomId: Number, update?: UpdateWithAggregationPipeline | UpdateQuery<GameEntity> | undefined,) {
    return this.gameModel.updateOne({ roomId }, update);
  }

  getGameInfo(id: ObjectId) {
    return this.gameModel.findById(id).populate('teams.players stats');
  }
}
