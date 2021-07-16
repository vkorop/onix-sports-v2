import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId, ObjectID } from 'mongodb';
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

  finish(_id: ObjectId, winner: Winner, stats: Array<ObjectId>) {
    return this.gameModel.updateOne({ _id, finished: false }, { finished: true, winner, stats });
  }
}
