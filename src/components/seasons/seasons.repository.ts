import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SeasonEntity } from "./schemas/season.schema";
import { seasonsConstants } from "./seasons-constants";

@Injectable()
export class SeasonsRepository {
    constructor(
        @InjectModel(seasonsConstants.models.seasons)
        private readonly seasonsModel: Model<SeasonEntity>,
    ) {}

    public create(season: any) {
        return this.seasonsModel.create(season);
    }

    public closeOpened() {
        return this.seasonsModel.updateOne({ closed: false }, { $set: { closed: true, end: new Date() } });
    }
}