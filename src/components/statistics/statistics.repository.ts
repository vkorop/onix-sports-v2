import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import statisticsConstants from './statistics-constants';
import { StatisticEntity } from './schemas/statistic.schema';
import CreateStatsDto from './dto/create-stats.dto';
import { statsAggregationPipe } from './helpers/stats-aggregation.helper';
import { lastGamesAggregationPipe } from './helpers/last-games-pipe.helper';

@Injectable()
export default class StatisticsRepository {
  constructor(
    @InjectModel(statisticsConstants.models.statistics) 
    private readonly statisticModel: Model<StatisticEntity>
  ) {}

  create(stats: CreateStatsDto[]) {
    return this.statisticModel.create(stats);
  }

  public async getStatsPeriod(ids: ObjectId[] = [], dateFrom: Date = new Date(0), dateTo: Date = new Date(Date.now())) {
    const pipe: any = [{
      $match: {
        createdAt: { 
          $gte: dateFrom,
          $lte: dateTo,
        },
      }
    }];

    return this.aggregateStats(ids, pipe);
  }

  public async getTournament(tournament: ObjectId) {
    const pipe: any = [{ $match: { tournament } }];

    return this.aggregateStats([], pipe);
  }

  public getLastGames(ids: ObjectId[], count: Number) {
    return this.aggregateStats(ids, lastGamesAggregationPipe(count));
  }

  private async aggregateStats(ids: ObjectId[], pipe: any[] = []) {
    const $match: any = {};

    if (ids && ids.length) {
      $match.user = { $in: ids } ;
    }
    
    return this.statisticModel.aggregate([
      { $match },
      ...pipe,
      ...statsAggregationPipe(),
    ]);
  }
}
