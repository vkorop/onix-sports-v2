import { ActionService } from "@components/action/action.service";
import { StatisticsService } from "@components/statistics/statistics.service";
import { Injectable } from "@nestjs/common";
import { EventEmitter } from "stream";
import { Game } from "./core/game.class";
import { Teams } from "./enum/teams.enum";
import GamesRepository from "./games.repository";
import { gameEvent } from "./utils/event.util";
import { ObjectId } from 'mongodb';

@Injectable()
export class GameProcessService {
  constructor(
    private readonly gameRepository: GamesRepository,

    private readonly statisticService: StatisticsService,
    private readonly actionService: ActionService,
  ) {}

  private games: {[key: string]: Game} = {};
  private emiter: EventEmitter = new EventEmitter();

  get Emiter() {
    return this.emiter;
  }

  private appendGame(game: Game) {
    this.emiter.once(gameEvent(game.id, 'finish'), () => {
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

  public async start(id: String) {
    const { players, title } = await this.gameRepository.getGameInfo(id);

    const game: Game = Game.create({ 
      id, 
      teams: players,
      title,
      emiter: this.emiter,
    });

    this.appendGame(game);

    await this.saveGame(id, game.info());
  }

  public goal(id: any, playerId: any) {
    return this.getGame(id)
      .goal(playerId)
      .info();
  }

  public info(id: any) {
    return this.getGame(id).info();
  }

  public async pause(id: any) {
    const info = this.getGame(id).pause().info();

    await this.saveGame(id, info);

    return info;
  }

  public async unpause(id: any) {
    const info = this.getGame(id).unpause().info();

    await this.saveGame(id, info);

    return info;
  }

  public swap(id: any, playerId: any) {
    return this.getGame(id)
      .swap(playerId)
      .info();
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

    const actions = info.actions ? info.actions.map((action) => ({
        ...action,
        game: new ObjectId(game.id),
        player: action.player?._id,
    })): [];  
    
    const actionsIds = (await this.actionService.create(actions)).map(e => e._id);
    const statsIds = (await this.statisticService.saveStats(stats)).map(e => e._id);

    await this.saveGame(game.id, info, statsIds, actionsIds);

    this.emiter.emit('finished', { id: info.id });
  }

  private saveGame(id: any, info: any, stats: ObjectId[] = [], actions: ObjectId[] = []) {
    return this.gameRepository.updateById(id, {
      $set: {
        stats,
        actions,
        score: [info.score[Teams.red], info.score[Teams.blue]],
        status: info.status,
        winner: info.winner,
        startedAt: info.startedAt,
        finishedAt: info.finishedAt,
        duration: info.finishedAt.valueOf() - info.startedAt.valueOf(),
      }
    });
  }
}