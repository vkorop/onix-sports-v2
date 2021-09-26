import { ApiProperty } from "@nestjs/swagger";
import { Goals } from "../enum/goal.type";
import { Positions } from "../enum/positions.enum";
import { Teams } from "../enum/teams.enum";

export class Player {
  @ApiProperty({ type: String })
  _id: any;

  @ApiProperty({ type: String })
  name: any;

  @ApiProperty({ type: Number })
  mGoals: any;

  @ApiProperty({ type: Number })
  rGoals: any;

  @ApiProperty({ type: Number })
  amGoals: any;

  @ApiProperty({ type: Number })
  arGoals: any;

  @ApiProperty({ type: String })
  team: Teams;

  @ApiProperty({ type: String })
  position: any;

  constructor({ _id, name, team, position }: any) {
      this._id = _id;
      this.name = name;
      this.mGoals = 0;
      this.rGoals = 0;
      this.amGoals = 0;
      this.arGoals = 0;
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

  public autogoal() {
    if (this.position == Positions.forward) {
      this.amGoals = this.amGoals + 1;
    } else {
      this.arGoals = this.arGoals + 1;
    }
  }
}