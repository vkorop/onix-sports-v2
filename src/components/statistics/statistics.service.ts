import { GameInfo } from '@components/games/core/interfaces/game-info.interface';
import { GamesService } from '@components/games/games.service';
import { Game } from '@components/games/core/game.class';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ObjectId } from 'mongodb';
import StatisticsRepository from './statistics.repository';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly statisticRepository: StatisticsRepository,
    private readonly gameService: GamesService,
  ) {}

  @OnEvent('games.finished', { async: true })
  public async saveStats({ game, info }: { game: Game, info: GameInfo }) {
    const stats = info.players.map((player) => ({
      user: player._id,
      mGoals: player.mGoals,
      rGoals: player.rGoals,
      team: player.team,
      won: player.team == info.winner,
      game: info.id,
    }));

    const _stats = await this.statisticRepository.create(stats);

    await this.gameService.pushStats(new ObjectId(game.id), _stats.map(({_id}) => _id));

    return _stats;
  }

  public getStats(ids: ObjectId[], dateFrom: Date = new Date(0), dateTo: Date = new Date(Date.now())) {
    return this.statisticRepository.getStats(ids, dateFrom, dateTo);
  }
}
