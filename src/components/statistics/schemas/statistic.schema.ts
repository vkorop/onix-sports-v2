import { Document, Schema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

import statisticsConstants from '../statistics-constants';

export class StatisticEntity extends Document {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId = new ObjectId();
}

export const StatisticSchema = new Schema(
  {
    mGoals: {
      type: Number,
      defaults: 0,
      required: true,
    },
    rGoals: {
      type: Number,
      defaults: 0,
      required: true,
    },
    won: {
      type: Boolean,
      required: true,
    },
    // game: {
    //   type: ObjectId,
    //   required: true,
    // },
    user: {
      type: ObjectId,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
    collection: statisticsConstants.models.statistics,
  },
);
