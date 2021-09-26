import { StringObjectId } from "@components/common/types/string-objectid.type";
import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";

export default class CreateGameDto {
    @ApiProperty({ type: String })
    readonly title?: string | null = '';

    @ApiProperty({ type: [String] })
    readonly players: ObjectId[] = [];

    @ApiProperty({ type: String })
    readonly tournament: StringObjectId = '';
}