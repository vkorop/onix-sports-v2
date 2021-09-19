import EventEmitter from "events";
import { ActionType } from "../enum/action-type.enum";
import { GameStatus } from "../enum/game-status.enum";
import { Positions } from "../enum/positions.enum";
import { Teams } from "../enum/teams.enum";
import { gameEvent } from "../utils/event.util";
import { Action } from "./action.class";
import { GameInfo } from "./interfaces/game-info.interface";
import { Player } from "./player.class";
import { Players } from "./players-list.class";

const TEAMS_ORDER = [Teams.red, Teams.red, Teams.blue, Teams.blue]
const POSITIONS_ORDER = [Positions.goalkeeper, Positions.forward, Positions.goalkeeper, Positions.forward];

export class Game {
  id: any;
  private title: string = '';
  private players: Players = new Players([]);
  private actions: Action[] = [];
  private score = { [Teams.red]: 0, [Teams.blue]: 0 };
  private status: GameStatus = GameStatus.STARTED;
  private winner: Teams = Teams.red;
  private startedAt = new Date();
  private finishedAt: Date = new Date();

  emiter: EventEmitter = new EventEmitter();

  constructor({ id, teams, title, emiter }: any) {
    const _players = teams.map(({ _id, name }: any, i: number) => new Player({
      _id,
      name,
      team: TEAMS_ORDER[i],
      position: POSITIONS_ORDER[i],
    }));

    this.id = id;
    this.title = title;
    this.players = new Players(_players);
    this.emiter = emiter;

    this.pushAction({ type: ActionType.START });
  }

  static create(gameObj: any) {
    return new Game(gameObj);
  }

  private _score(team: Teams) {
    this.score[team] = this.score[team] + 1;

    if (this.score[team] === 10) {
      this.finish(team);
    } 
  }

  public goal(id: any) {
    if (this.status === GameStatus.PAUSED) throw new Error('Game is paused!');

    const player = this.players.get(id);

    player.goal();

    this._score(player.team);

    // Needs to be moved somewhere
    const type = player.position == Positions.forward ? ActionType.MGOAL : ActionType.RGOAL;
    this.pushAction({ type, player: player });

    return this;
  }

  public pause() {
    this.status = GameStatus.PAUSED;

    this.pushAction({ type: ActionType.PAUSE });

    return this;
  }

  public unpause() {
    this.status = GameStatus.UNPAUSED;

    this.pushAction({ type: ActionType.RESUME });

    return this;
  }

  public swap(id: any) {
    const player = this.players.get(id);
    const teamate =this.players.getTeamate(id);
    let position = player.position;

    player.position = teamate.position;
    teamate.position = position;

    this.pushAction({ type: ActionType.SWAP, playerId: id });

    return this;
  }

  public pushAction({ type, player }: any) {
    const info = this.info();

    delete info.actions;
    
    this.actions.push(new Action({ type, player, info }));
  }

  private finish(team: Teams) {
    this.winner = team;
    this.finishedAt = new Date();
    this.status = GameStatus.FINISHED;

    this.emiter.emit(gameEvent(this.id, 'finish'));

    this.pushAction({ type: ActionType.FINISH, info: this.info() });
  }

  public info(): GameInfo {
    return { 
      id: this.id,
      title: this.title,
      players: this.players.toArray(),
      actions: this.actions,
      score: this.score,
      status: this.status,
      winner: this.winner,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
    };
  }
}