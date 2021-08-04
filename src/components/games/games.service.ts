import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import CreateGamesDto from './dto/create-game.dto';
import FinishGameDto from './dto/finish-game.dto';
import GamesRepository from './games.repository';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
  ) {}

  public createGames(games: CreateGamesDto[]) {
    return this.gamesRepository.create(games);
  }

  public finishGame({ id, winner }: FinishGameDto) {
    return this.gamesRepository.finish(id, winner);
  }

  public getGameInfo(id: ObjectId) {
    return this.gamesRepository.getGameInfo(id);
  }
}
