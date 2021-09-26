import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
import CreateGamesDto from './dto/create-game.dto';
import GamesRepository from './games.repository';
import { GameEntity } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async createGames(_games: CreateGamesDto[], select?: any) {
    const games = await this.gamesRepository.create(_games, select);

    await this.eventEmitter.emitAsync('games.created', { games });

    return games;
  }

  public getGameInfo(id: ObjectId) {
    return this.gamesRepository.getGameInfo(id);
  }

  public getGames(query: FilterQuery<GameEntity>, limit: number = 0, skip: number = 0) {
    return this.gamesRepository.getGames(query, limit, skip);
  }

  public pushStats(id: ObjectId, stats: ObjectId[]) {
    return this.gamesRepository.updateById(id, { stats });
  }

  public pushActions(id: ObjectId, actions: ObjectId[]) {
    return this.gamesRepository.updateById(id, { actions });
  }
}
