import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TournamentSchema } from "./schemas/tournament.schema";
import { TournamentConstants } from "./tournament.constants";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TournamentConstants.models.tournaments,
        collection: TournamentConstants.models.tournaments,
        schema: TournamentSchema,
      }
    ])
  ]
})
export class TournamentModule {}
