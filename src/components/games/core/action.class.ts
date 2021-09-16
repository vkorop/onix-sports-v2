export class Action {
  type: any;
  playerId: any | null;
  time: any;

  constructor({ type, playerId }: any) {
    this.type = type;
    this.playerId = playerId;
    this.time = new Date();
  }
}