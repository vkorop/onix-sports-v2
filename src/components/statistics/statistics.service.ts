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

  public getStats(ids: string, dateFrom: string, dateTo: string) {
    const _ids: ObjectId[] = ids.split(',').map(id => new ObjectId(id));

    return this.statisticRepository.getStats(_ids, new Date(Number(dateFrom)), new Date(Number(dateTo)));
  }
}
