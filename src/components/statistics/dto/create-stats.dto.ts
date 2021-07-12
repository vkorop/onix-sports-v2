import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from 'mongodb';

export default class CreateStatsDto {
    @ApiProperty({ type: Number })
    readonly mGoals: number = 0;

    @ApiProperty({ type: String })
    readonly rGoals: number = 0;

    @ApiProperty({ type: Boolean })
    readonly won: boolean = false;

    @ApiProperty({ type: ObjectId })
    readonly user: ObjectId = new ObjectId();
}