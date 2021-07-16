import { Document, Schema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

import gameConstants from '../games-constants';
import { Winner } from '../enum/winner.enum';

export class GameEntity extends Document {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId = new ObjectId();
}

export const GameSchema = new Schema(
  {
    title: {
      type: String,
      default: '',
      required: true,
    },
    teams: {
      type: [[ObjectId]],
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
      required: true,
    },
    stats: {
      type: [ObjectId],
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
