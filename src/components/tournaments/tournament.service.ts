import { StringObjectId } from "@components/common/types/string-objectid.type";
import { GameEntity } from "@components/games/schemas/game.schema";
import { Injectable } from "@nestjs/common";
import { OnEvent, EventEmitter2 } from "@nestjs/event-emitter";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { TournamentStatus } from "./enum/tour-status.enum";
import { TournamentRepository } from "./tournament.repository";

@Injectable()
export class TournamentService {
  constructor(
    private readonly tournamentRepository: TournamentRepository,
    private readonly eventEmitter: EventEmitter2,
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

  @OnEvent('games.created', { async: true })
  async pushGames({ games }: { games: GameEntity[] }) {
    const _games = Array.isArray(games) ? games : [games]; 
    const promises = _games.map(({ tournament, _id, players }) => 
      this.tournamentRepository.update({ 
        _id: tournament,
        status: TournamentStatus.OPENED 
      }, { 
        $push: { games: _id },
        $addToSet: { players: players.map(({_id}: any) => _id) } 
      }));
    
    await Promise.all(promises);
  }

  async closeTournament(id: String) {
    const res = await this.tournamentRepository.updateById(id, { $set: { status: TournamentStatus.CLOSED } });
    
    this.eventEmitter.emit('tournament.closed', { tournament: { id: res?._id } });

    return res;
  }
}