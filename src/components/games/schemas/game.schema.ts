import { Document, Mixed } from 'mongoose';
import { ObjectId } from 'mongodb';

import gameConstants from '../games-constants';
import statisticsConstants from '@components/statistics/statistics-constants';
import userConstants from '@components/users/user-constants';
import { GameStatus } from '../enum/game-status.enum';
import { Teams } from '../enum/teams.enum';
import { TournamentConstants } from '@components/tournaments/tournament.constants';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StringObjectId } from '@components/common/types/string-objectid.type';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: gameConstants.models.games,
})
export class Game {
  @Prop({ type: Number, default: '' })
  title: Number; 

  @Prop({ type: ObjectId, required: true, ref: userConstants.models.users })
  players: ObjectId;

  @Prop({ type: [ObjectId], ref: statisticsConstants.models.statistics })
  stats: ObjectId[];

  @Prop({ type: Teams })
  winner: Teams;

  @Prop({ type: GameStatus, default: GameStatus.DRAFT })
  status: GameStatus;

  @Prop({ type: [ObjectId], default: [] })
  watchers: ObjectId[];

  @Prop({ type: [ObjectId], default: [] })
  actions: ObjectId[];

  @Prop({ type: Date })
  startedAt: Date;

  @Prop({ type: Date })
  finishedAt: Date;

  @Prop({ type: [Number] })
  score: Number[];

  @Prop({ type: Number, default: 0 })
  duration: Number;

  @Prop({ type: ObjectId, ref: TournamentConstants.models.tournaments })
  tournament: any;
};

export type GameEntity = Game & Document;

export const GameSchema = SchemaFactory.createForClass(Game);
