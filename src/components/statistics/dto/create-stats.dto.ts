import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from 'mongodb';

export default class CreateStatsDto {
    @ApiProperty({ type: Number })
    readonly mGoals: number = 0;

    @ApiProperty({ type: Number })
    readonly rGoals: number = 0;

    @ApiProperty({ type: Boolean })
    readonly won: boolean = false;

    @ApiProperty({ type: String })
    readonly user: ObjectId = new ObjectId();
    
    @ApiProperty({ type: String })
    readonly game: ObjectId = new ObjectId();
}