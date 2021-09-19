import { ActionType } from "../enum/action-type.enum";

export class Action {
  type: any;
  player: any | null;
  time: any;
  info: any;

  constructor({ type, player, info }: { type: ActionType, player?: any, info: any }) {
    this.type = type;
    this.player = player;
    this.time = new Date();
    this.info = info;
  }
}
