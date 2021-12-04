import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SeasonsService } from "./seasons.service";

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
    constructor(
        private readonly seasonsService: SeasonsService,
    ) {}

    @Post('close')
    public closeSeason() {
        return this.seasonsService.close();
    }
}