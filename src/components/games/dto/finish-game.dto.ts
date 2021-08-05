import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from 'mongodb';
import { Winner } from "../enum/winner.enum";

export default class FinishGameDto {
    @ApiProperty({ type: String })
    readonly id: ObjectId = new ObjectId();

    @ApiProperty({ type: Number })
    readonly winner: Winner = Winner.red;

    @ApiProperty({ type: [String] })
    readonly stats: [ObjectId] = [new ObjectId()];
}