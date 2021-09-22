import { StringObjectId } from "@components/common/types/string-objectid.type";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, UpdateQuery, UpdateWithAggregationPipeline } from "mongoose";
import { CreateTournamentDto } from "./dto/create-tournament.dto";
import { TournamentDocument } from "./schemas/tournament.schema";
import { TournamentConstants } from "./tournament.constants";

@Injectable()
export class TournamentRepository {
  constructor(
    @InjectModel(TournamentConstants.models.tournaments)
    private readonly tournamentModel: Model<TournamentDocument>,
  ) {}

  create(tournament: CreateTournamentDto) {
    return this.tournamentModel.create(tournament);
  }

  getAll({ skip, limit, query }: any = { skip: 0, limit: 0, query: {} }) {
    return this.tournamentModel.find(query).skip(skip).limit(limit);
  }

  async getById(id: StringObjectId) {
    const tournament = this.tournamentModel.findById(id);

    if (!tournament) throw new Error('Tournament not found')

    return tournament;
  }

  updateById(id: StringObjectId, update: UpdateWithAggregationPipeline | UpdateQuery<TournamentDocument>) {
    return this.tournamentModel.findByIdAndUpdate(id, update);
  }
}