import CreateGameDto from "@components/games/dto/create-game.dto";
import { GamesService } from "@components/games/games.service";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { ObjectId } from "mongoose";
import { fourPlayersPlan } from "./helpers/4-players.helper";
import { fivePlayersPlan } from "./helpers/5-players.helper";
import { sixPlayersPlan } from "./helpers/6-players.helper";
import { eightPlayersPlan } from "./helpers/8-players.helper";
import { shuffle } from "./helpers/shuffle.helper";
import { TournamentService } from "./tournament.service";

@Injectable()
export class TournamentGenerator {
  constructor(
    private readonly gameService: GamesService,
    private readonly tournamentService: TournamentService,
    
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private plans: {[key: number]: (ids: ObjectId[], tournament: ObjectId) => {
    players: ObjectId[];
    tournament: ObjectId;
  }[]} = {
    4: fourPlayersPlan,
    5: fivePlayersPlan,
    6: sixPlayersPlan,
    8: eightPlayersPlan,
  };

  public async generate(ids: ObjectId[], title?: string) {
    const { _id } = await this.tournamentService.create({ title });
    const shuffled = shuffle<ObjectId>(ids);

    const _games: CreateGameDto[] = this.plans[ids.length] ? this.plans[ids.length](shuffled, _id) : [];
    const games = await this.gameService.createGames(_games);

    await this.eventEmitter.emitAsync('tournament.generated', { games, tournament: { title, _id } });

    return { games, tournament: { title, _id } };
  }
}