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
      amGoals: player.amGoals,
      arGoals: player.arGoals,
      team: player.team,
      won: player.team == info.winner,
      game: new ObjectId(info.id),
      tournament: info.tournament,
    }));

    const _stats = await this.statisticRepository.create(stats);

    await this.gameService.pushStats(new ObjectId(game.id), _stats.map(({_id}) => _id));

    return _stats;
  }

  public getStats(ids: ObjectId[], dateFrom?: Date, dateTo?: Date) {
    return this.statisticRepository.getStatsPeriod(ids, dateFrom, dateTo);
  }

  public getTournamentStats(id: ObjectId) {
    return this.statisticRepository.getTournament(id);
  }

  public async getTournamentPerform(id: ObjectId) {
    const stats = await this.statisticRepository.getTournament(id);

    const goals = [...stats]
      .sort((b, a) => (+a.goals / a.games) - (+b.goals / b.games) || (a.won / a.games) - (b.won / b.games));

    const totalGoals = stats.reduce((acc, val) => acc + val.goals, 0);

    return {
      goals,
      totalGoals
    };
  }
}
