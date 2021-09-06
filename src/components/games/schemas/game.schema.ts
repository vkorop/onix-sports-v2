import { Document, Schema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

import gameConstants from '../games-constants';
import { Winner } from '../enum/winner.enum';
import statisticsConstants from '@components/statistics/statistics-constants';
import userConstants from '@components/users/user-constants';
import { GameStatus } from '../enum/game-status.enum';

export class GameEntity extends Document {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId = new ObjectId();
}

export class ActionEntity {
  constructor({ type, playerId }: any) {
    this.type = type;
    this.playerId = playerId;
    this.date = new Date();
  }

  readonly type: string = '';
  readonly playerId: ObjectId = new ObjectId();
  readonly date: Date = new Date();
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
    stats: {
      type: [ObjectId],
      ref: statisticsConstants.models.statistics
    },
    winner: {
      type: Winner,
    },
    status: {
      type: GameStatus,
      default: GameStatus.DRAFT,
    },
    roomId: {
      type: Number,
      default: Date.now()
    },
    watchers: {
      type: [ObjectId],
      default: [],
    },
    actions: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    startedAt: {
      type: Date,
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
