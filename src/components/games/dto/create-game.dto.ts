import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from 'mongodb';

export default class CreateGameDto {
    @ApiProperty({ type: String })
    readonly title: string | null = '';

    @ApiProperty({ type: [] })
    readonly teams: Array<Array<ObjectId>> = [];

    @ApiProperty({ type: [] })
    readonly tournament: ObjectId | null = new ObjectId();
}