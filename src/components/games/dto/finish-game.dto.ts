import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from 'mongodb';
import { Winner } from "../enum/winner.enum";

export default class FinishGameDto {
    @ApiProperty({ type: ObjectId })
    readonly id: ObjectId = new ObjectId();

    @ApiProperty({ type: Winner })
    readonly winner: Winner = Winner.red;

    @ApiProperty({ type: [] })
    readonly stats: Array<ObjectId> = [];
}