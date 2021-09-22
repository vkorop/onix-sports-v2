import { ApiProperty } from "@nestjs/swagger";

export class CreateTournamentDto {
  @ApiProperty({ type: String })
  readonly title: string = '';
}