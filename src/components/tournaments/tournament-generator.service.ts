import { GamesService } from "@components/games/games.service";
import { UserEntity } from "@components/users/schemas/user.schema";
import { UsersService } from "@components/users/users.service";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { ObjectId } from "mongodb";
import { Document } from "mongoose";
import { TournamentType } from "./enum/tour-type.enum";
import { fourPlayersTournament } from "./helpers/4-players.helper";
import { fivePlayersTournament } from "./helpers/5-players.helper";
import { sixPlayersTournament } from "./helpers/6-players.helper";
import { eightPlayersTournament } from "./helpers/8-players.helper";
import { shuffle } from "./helpers/shuffle.helper";
import { Tournament } from "./schemas/tournament.schema";
import { TournamentService } from "./tournament.service";

@Injectable()
export class TournamentGenerator {
  constructor(
    private readonly gameService: GamesService,
    private readonly tournamentService: TournamentService,
    private readonly userService: UsersService,
    
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private plans: {[key: number]: any} = {
    4: fourPlayersTournament,
    5: fivePlayersTournament,
    6: sixPlayersTournament,
    8: eightPlayersTournament,
  };

  public async generate(ids: ObjectId[], _title?: string) {
    let tournament: (Tournament & Document & Document<any, any>) | null = await this.tournamentService.create({ title: _title });

    const players = await Promise.all(ids.map((id: ObjectId) => this.userService.getUser(id)));
    const shuffled = shuffle<UserEntity | any>(players);

    const { type, games: _games, teams }: any = this.plans[ids.length] ? this.plans[ids.length](shuffled, tournament._id) : [];
    const games = await this.gameService.createGames(_games, { _id: 1, name: 1 });

    await tournament.update({ type });

    tournament = await this.tournamentService.getOne(tournament._id);
    
    await this.eventEmitter.emitAsync('tournament.generated', { games, tournament, teams });

    return { games, tournament, teams };
  }
}