import { StringObjectId } from "@components/common/types/string-objectid.type";
import { GameEntity } from "@components/games/schemas/game.schema";
import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { TournamentStatus } from "./enum/tour-status.enum";
import { TournamentRepository } from "./tournament.repository";

@Injectable()
export class TournamentService {
  constructor(
    private readonly tournamentRepository: TournamentRepository,
  ) {}

  create(tournament: CreateTournamentDto) {
    return this.tournamentRepository.create(tournament);
  }

  getMany(query: any) {
    return this.tournamentRepository.getAll(query);
  }

  getOne(id: StringObjectId) {
    return this.tournamentRepository.getById(id);
  }

  async pushGame(id: StringObjectId, game: GameEntity) {
    const tournament = await this.tournamentRepository.getById(id);

    if (tournament?.status !== TournamentStatus.OPENED) throw new Error(`Tournament ${tournament?.title} is closed!`);

    return tournament?.update({ $push: { games: game._id }, $addToSet: { players: game.players } });
  }

  closeTournament(id: StringObjectId) {
    return this.tournamentRepository.updateById(id, { $set: { status: TournamentStatus.CLOSED } });
  }
}