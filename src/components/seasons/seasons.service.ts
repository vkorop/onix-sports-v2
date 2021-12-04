import { Injectable } from "@nestjs/common";
import { SeasonsRepository } from "./seasons.repository";

@Injectable()
export class SeasonsService {
    constructor(
        private readonly seasonsRepository: SeasonsRepository,
    ) {}

    public async close() {
        await this.seasonsRepository.closeOpened();

        return this.seasonsRepository.create({});
    }
}