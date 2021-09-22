import { StringObjectId } from "@components/common/types/string-objectid.type";
import { ApiProperty } from "@nestjs/swagger";
import { PlayersDto } from "./players.dto";

export default class CreateGameDto {
    @ApiProperty({ type: String })
    readonly title: string | null = '';

    @ApiProperty({ type: PlayersDto })
    readonly players: PlayersDto = new PlayersDto();

    @ApiProperty({ type: String })
    readonly tournament: StringObjectId = '';
}