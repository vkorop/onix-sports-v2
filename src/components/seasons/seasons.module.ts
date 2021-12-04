import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SeasonSchema } from "./schemas/season.schema";
import { SeasonsController } from "./season.controller";
import { seasonsConstants } from "./seasons-constants";
import { SeasonsRepository } from "./seasons.repository";
import { SeasonsService } from "./seasons.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: seasonsConstants.models.seasons,
                collection: seasonsConstants.models.seasons,
                schema: SeasonSchema,
            }
        ])
    ],
    controllers: [SeasonsController],
    providers: [SeasonsService, SeasonsRepository],
})
export class SeasonsModule {}