import { ActionType } from "@components/games/enum/action-type.enum";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from 'mongodb';

export class CreateActionDto {
  @ApiProperty({ type: ActionType })
  type: ActionType = ActionType.MGOAL;

  @ApiProperty({ type: String })
  player: ObjectId | null = new ObjectId();

  @ApiProperty({ type: Date })
  time: Date = new Date();

  @ApiProperty({ type: Object })
  info: any;
}