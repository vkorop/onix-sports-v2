import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { ActionType } from "../enum/action-type.enum";

export class Action {
  @ApiProperty({ type: String })
  type: any;

  @ApiProperty({ type: String })
  player: any | null;

  @ApiProperty({ type: String })
  time: any;

  @ApiProperty({ type: String })
  timeFromStart: number;

  @ApiProperty({ type: String })
  info: any;

  @ApiProperty({ type: String })
  game: ObjectId;

  constructor({ type, player, info, game, startedAt }: { type: ActionType, player?: any, info: any, game: ObjectId, startedAt: Date }) {
    this.type = type;
    this.player = player;
    this.time = new Date();
    this.timeFromStart = new Date().valueOf() - startedAt.valueOf();
    this.info = info;
    this.game = game;
  }
}
