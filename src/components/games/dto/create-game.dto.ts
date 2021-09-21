import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from 'mongodb';
import { PlayersDto } from "./players.dto";

export default class CreateGameDto {
    @ApiProperty({ type: String })
    readonly title: string | null = '';

    @ApiProperty({ type: PlayersDto })
    readonly players: PlayersDto = new PlayersDto();

    @ApiProperty({ type: String })
    readonly tournament: ObjectId | null = new ObjectId();
}