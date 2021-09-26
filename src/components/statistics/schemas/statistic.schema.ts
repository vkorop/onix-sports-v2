import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

import statisticsConstants from '../statistics-constants';
import userConstants from '@components/users/user-constants';
import gamesConstants from '@components/games/games-constants';
import { Teams } from '@components/games/enum/teams.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: statisticsConstants.models.statistics,
  strict: true,
})
export class Statistic {
  @Prop({ type: Number, default: 0 })
  mGoals: Number;

  @Prop({ type: Number, default: 0 })
  rGoals: Number;

  @Prop({ type: Number, default: 0 })
  amGoals: Number;

  @Prop({ type: Number, default: 0 })
  arGoals: Number;

  @Prop({ type: Boolean, required: true })
  won: Boolean;

  @Prop({ type: ObjectId, ref: gamesConstants.models.games })
  game: ObjectId;

  @Prop({ type: ObjectId, required: true, ref: userConstants.models.users })
  user: ObjectId;

  @Prop({ type: Teams, required: true })
  team: Teams;
};

export type StatisticEntity = Statistic & Document;

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
