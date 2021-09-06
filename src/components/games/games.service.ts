import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import CreateGamesDto from './dto/create-game.dto';
import FinishGameDto from './dto/finish-game.dto';
import { GameStatus } from './enum/game-status.enum';
import { Winner } from './enum/winner.enum';
import GamesRepository from './games.repository';
import { ActionEntity } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
  ) {}

  public createGames(games: CreateGamesDto[]) {
    return this.gamesRepository.create(games);
  }

  public startGame(id: any) {
    return this.gamesRepository.updateByRoom(id, { $set: { status: GameStatus.STARTED, startedAt: new Date() } })
  }

  public saveAction(id: any, { actionType, playerId }: any) {
    const action = new ActionEntity({ type: actionType, playerId });

    return this.gamesRepository.updateByRoom(id, { $push: { actions: action } })
  }

  public async finishGame(id: any, { winner, stats }: any) {
    return this.gamesRepository.updateByRoom(id, { $set: { status: GameStatus.FINISHED, winner, stats } });
  }

  public getGameInfo(id: ObjectId) {
    return this.gamesRepository.getGameInfo(id);
  }
}
