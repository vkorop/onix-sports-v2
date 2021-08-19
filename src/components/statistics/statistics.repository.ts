import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId, ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import statisticsConstants from './statistics-constants';
import { StatisticEntity } from './schemas/statistic.schema';
import CreateStatsDto from './dto/create-stats.dto';


@Injectable()
export default class StatisticsRepository {
  constructor(
    @InjectModel(statisticsConstants.models.statistics) 
    private readonly statisticModel: Model<StatisticEntity>
  ) {}

  create(stats: CreateStatsDto[]) {
    return this.statisticModel.create(stats);
  }

  async getStats(ids: ObjectId[], dateFrom: Date, dateTo: Date) {
    console.log(ids, dateFrom, dateTo)

    return this.statisticModel.aggregate([
      {
        $match: {
          user: {
            $in: ids 
          },
          createdAt: { 
            $gte: dateFrom,
            $lte: dateTo,
          },
        },
      },
      {
        $group: {
          _id: "$user",
          mGoals: {
            $sum: "$mGoals",
          },
          rGoals: {
            $sum: "$rGoals",
          },
          won: {
            $sum: {
              $cond: ["$won", 1, 0],
            },
          },
          games: {
            $sum: {
              $cond: [true, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
      {
        $addFields: {
          name: "$user.name",
        },
      },
      {
        $unset: "user",
      },
    ]);
  }
}
