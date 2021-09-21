import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import CreateStatsDto from './dto/create-stats.dto';
import StatisticsRepository from './statistics.repository';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly statisticRepository: StatisticsRepository,
  ) {}

  public saveStats(stats: CreateStatsDto[]) {
    return this.statisticRepository.create(stats);
  }

  public getStats(ids: ObjectId[], dateFrom: Date = new Date(0), dateTo: Date = new Date(Date.now())) {
    return this.statisticRepository.getStats(ids, dateFrom, dateTo);
  }
}
