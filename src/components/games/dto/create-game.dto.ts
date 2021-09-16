import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from 'mongodb';

export default class CreateGameDto {
    @ApiProperty({ type: String })
    readonly title: string | null = '';

    @ApiProperty({ type: [String] })
    readonly players: [ObjectId] = [new ObjectId];

    @ApiProperty({ type: String })
    readonly tournament: ObjectId | null = new ObjectId();
}