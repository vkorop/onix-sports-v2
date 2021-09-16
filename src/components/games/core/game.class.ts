import EventEmitter from "events";
import { GameStatus } from "../enum/game-status.enum";
import { Positions } from "../enum/positions.enum";
import { Teams } from "../enum/teams.enum";
import { gameEvent } from "../utils/event.util";
import { Action } from "./action.class";
import { Player } from "./player.class";

const TEAMS_ORDER = [Teams.red, Teams.red, Teams.blue, Teams.blue]
const POSITIONS_ORDER = [Positions.goalkeeper, Positions.forward, Positions.goalkeeper, Positions.forward];

export class Game {
  id: any;
  private title: string = '';
  private players: Player[] = [];
  private actions: Action[] = [];
  private score = { [Teams.red]: 0, [Teams.blue]: 0 };
  private status: GameStatus = GameStatus.STARTED;
  private winner: Teams = Teams.red;
  private startedAt = new Date();
  private finishedAt: Date = new Date();

  emiter: EventEmitter = new EventEmitter();

  constructor({ id, teams, title, emiter }: any) {
    this.players = teams.map(({ _id, name }: any, i: number) => new Player({
      _id,
      name,
      team: TEAMS_ORDER[i],
      position: POSITIONS_ORDER[i],
    }));

    console.log(this.players);

    this.id = id;
    this.title = title;
    this.emiter = emiter;
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
    const player = this.players.find(({ _id }: any) => _id == id);

    if (!player) throw new Error('Player was not found');

    player.goal();

    this._score(player.team);
  }

  private finish(team: Teams) {
    this.winner = team;
    this.finishedAt = new Date();
    this.status = GameStatus.FINISHED;

    this.emiter.emit(gameEvent(this.id, 'finish'));
  }

  public info() {
    return { 
      id: this.id,
      title: this.title,
      players: this.players,
      actions: this.actions,
      score: this.score,
      status: this.status,
      winner: this.winner,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
    };
  }
}