import { Document, Schema, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import gamesConstants from '@components/games/games-constants';

export class EventEntity extends Document {
  @ApiProperty({ type: ObjectId })
  readonly playerId: ObjectId = new ObjectId();

  @ApiProperty({ type: String })
  readonly playerName: String = '';

  @ApiProperty({ type: String })
  readonly action: String = '';

  @ApiProperty({ type: Date })
  readonly date: Date = new Date();
}

export class MatchEntity extends Document {
  @ApiProperty({ type: String })
  readonly _id: Types.ObjectId = new ObjectId();

  @ApiProperty({ type: [EventEntity] })
  readonly actions: [EventEntity] = [new EventEntity()];
}

export const MatchSchema = new Schema(  
  {
    game: {
      type: ObjectId,
      ref: gamesConstants.models.games,
      required: true,
    },
    actions: {
      type: [EventEntity],
      required: true,
      defaults: [],
    },
    finished: {
      type: Boolean,
      required: true,
      defaults: false,    
    },
    finishedAt: {
      type: Date,
      defaults: null,
    }
  },
  {
    versionKey: false,
    timestamps: true,
    // collection: gameConstants.models.games,
  },
);
