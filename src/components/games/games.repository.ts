import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import statisticsConstants from './games-constants';
import { GameEntity } from './schemas/game.schema';
import CreateGameDto from './dto/create-game.dto';


@Injectable()
export default class GamesRepository {
  constructor(
    @InjectModel(statisticsConstants.models.games) 
    private readonly gameModel: Model<GameEntity>
  ) {}

  create(games: CreateGameDto[]) {
    return this.gameModel.create(games);
  }

  updateById(_id: Number, update?: UpdateWithAggregationPipeline | UpdateQuery<GameEntity> | undefined,) {
    return this.gameModel.findByIdAndUpdate(_id, update);
  }

  getActions(roomId: Number) {
    return this.gameModel.findOne({ roomId }).select('actions');
  }

  async getGameInfo(id: ObjectId) {
    const game = await this.gameModel.findById(id).populate('players stats');

    if (!game) throw new Error('Game was not found');

    return game;
  }

  getGames(limit: number, skip: number) {
    return this.gameModel.find().skip(skip).limit(limit);
  }
}
