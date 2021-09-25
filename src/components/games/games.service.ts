import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { ObjectId } from 'mongodb';
import CreateGamesDto from './dto/create-game.dto';
import GamesRepository from './games.repository';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async createGames(games: CreateGamesDto[]) {
    const _games = await this.gamesRepository.create(games);
    
    await this.eventEmitter.emitAsync('games.created', { games });

    return _games;
  }

  public getGameInfo(id: ObjectId) {
    return this.gamesRepository.getGameInfo(id);
  }

  public getGames(limit: number = 0, skip: number = 0) {
    return this.gamesRepository.getGames(limit, skip);
  }

  public pushStats(id: ObjectId, stats: ObjectId[]) {
    return this.gamesRepository.updateById(id, { stats });
  }

  public pushActions(id: ObjectId, actions: ObjectId[]) {
    return this.gamesRepository.updateById(id, { actions });
  }
}
