import { Goals } from "../enum/goal.type";
import { Positions } from "../enum/positions.enum";
import { Teams } from "../enum/teams.enum";

export class Player {
  _id: any;
  name: any;
  mGoals: any;
  rGoals: any;
  team: Teams;
  position: any;

  constructor({ _id, name, team, position }: any) {
      this._id = _id;
      this.name = name;
      this.mGoals = 0;
      this.rGoals = 0;
      this.team = team;
      this.position = position;
  }

  public goal() {
    if (this.position == Positions.forward) {
      this.mGoals = this.mGoals + 1;
    } else {
      this.rGoals = this.rGoals + 1;
    }
  }
}