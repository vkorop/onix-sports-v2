import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { TournamentStatus } from "../enum/tour-status.enum";

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Tournament {
  @Prop()
  title: string = '';

  @Prop()
  players: ObjectId[] = [];

  @Prop()
  games: ObjectId[] = [];

  @Prop()
  status: TournamentStatus = TournamentStatus.OPENED;
};

export type TournamentDocument = Tournament & Document;

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
