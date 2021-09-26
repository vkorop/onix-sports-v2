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
  info: any;

  @ApiProperty({ type: String })
  game: ObjectId;

  constructor({ type, player, info, game }: { type: ActionType, player?: any, info: any, game: ObjectId }) {
    this.type = type;
    this.player = player;
    this.time = new Date();
    this.info = info;
    this.game = game;
  }
}
