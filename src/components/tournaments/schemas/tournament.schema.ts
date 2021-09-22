import gamesConstants from "@components/games/games-constants";
import userConstants from "@components/users/user-constants";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { TournamentStatus } from "../enum/tour-status.enum";

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Tournament {
  @Prop({ default: 'Tournament' })
  title: string = '';

  @Prop({ ref: userConstants.models.users, default: [] })
  players: ObjectId[] = [];

  @Prop({ ref: gamesConstants.models.games, default: [] })
  games: ObjectId[] = [];

  @Prop({ default: TournamentStatus.OPENED })
  status: TournamentStatus = TournamentStatus.OPENED;
};

export type TournamentDocument = Tournament & Document;

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
