import { StatisticsService } from "@components/statistics/statistics.service";
import { Injectable } from "@nestjs/common";
import { EventEmitter } from "stream";
import { Game } from "./core/game.class";
import { ActionType } from "./enum/action-type.enum";
import { Positions } from "./enum/positions.enum";
import { Teams } from "./enum/teams.enum";
import GamesRepository from "./games.repository";
import { gameEvent } from "./utils/event.util";

@Injectable()
export class GameProcessService {
  constructor(
    private readonly gameRepository: GamesRepository,

    private readonly statisticService: StatisticsService,
  ) {}

  private games: {[key: string]: Game} = {};
  private emiter: EventEmitter = new EventEmitter();

  private appendGame(game: Game) {
    game.emiter.once(gameEvent(game.id, 'finish'), () => {
      this.finish(game);
      this.removeGame(game.id);
    })

    this.games[game.id] = game;
  }

  private removeGame(id: any) {
    delete this.games[id];
  }

  private getGame(id: any) {
    const game = this.games[id];

    if (!game) throw new Error('Game was not found');

    return game;
  } 

  public async start(id: any) {
    const gameInfo = await this.gameRepository.getGameInfo(id);
    
    if (!gameInfo) throw new Error('Game was not found');
    
    const game: Game = Game.create({ 
      id, 
      teams: gameInfo.players,
      title: gameInfo.title,
      emiter: this.emiter,
    });

    this.appendGame(game);

    return game.info();
  }

  public goal(id: any, playerId: any) {
    return this.getGame(id).goal(playerId);
  }

  public info(id: any) {
    return this.getGame(id).info();
  }

  private async finish(game: Game) {
    const info = game.info();

    const stats = info.players.map((player) => ({
        user: player._id,
        mGoals: player.mGoals,
        rGoals: player.rGoals,
        team: player.team,
        won: player.team == info.winner,
        game: info.id,
      }));

    const statsEntities = await this.statisticService.saveStats(stats);

    await this.gameRepository.updateById(game.id, {
      $set: {
        stats: statsEntities.map(e => e._id),
        actions: info.actions,
        score: [info.score[Teams.red], info.score[Teams.blue]],
        status: info.status,
        winner: info.winner,
        startedAt: info.startedAt,
        finishedAt: info.finishedAt,
      }
    });
  }
}