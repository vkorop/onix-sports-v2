import { ApiProperty } from "@nestjs/swagger";

export class CreateTournamentDto {
  @ApiProperty({ type: String, required: false })
  readonly title?: string = '';
}