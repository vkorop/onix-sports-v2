import { Document, Schema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

import gameConstants from '../games-constants';
import { Winner } from '../enum/winner.enum';
import statisticsConstants from '@components/statistics/statistics-constants';
import userConstants from '@components/users/user-constants';

export class GameEntity extends Document {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId = new ObjectId();
}

export const TeamSchema = new Schema({
  players: {
    type: [ObjectId],
    ref: userConstants.models.users,
    required: true
  },
});

export const GameSchema = new Schema(
  {
    title: {
      type: String,
      default: '',
      required: true,
    },
    teams: {
      type: [TeamSchema],
      ref: userConstants.models.users,
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
      required: true,
    },
    stats: {
      type: [ObjectId],
      ref: statisticsConstants.models.statistics
    },
    winner: {
      type: Winner,
    },
    // tournament: {
    //   type: ObjectId,
    //   ref: ,
    // },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: gameConstants.models.games,
  },
);
