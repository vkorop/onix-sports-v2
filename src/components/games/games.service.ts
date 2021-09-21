import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import CreateGamesDto from './dto/create-game.dto';
import GamesRepository from './games.repository';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
  ) {}

  public createGames(games: CreateGamesDto[]) {
    return this.gamesRepository.create(games);
  }

  public getGameInfo(id: ObjectId) {
    return this.gamesRepository.getGameInfo(id);
  }

  public getGames(limit: number = 0, skip: number = 0) {
    return this.gamesRepository.getGames(limit, skip);
  }
}
