import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId, ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import statisticsConstants from './statistics-constants';
import { StatisticEntity } from './schemas/statistic.schema';
import CreateStatsDto from './dto/create-stats.dto';
import { Teams } from '@components/games/enum/teams.enum';


@Injectable()
export default class StatisticsRepository {
  constructor(
    @InjectModel(statisticsConstants.models.statistics) 
    private readonly statisticModel: Model<StatisticEntity>
  ) {}

  create(stats: CreateStatsDto[]) {
    return this.statisticModel.create(stats);
  }

  public async getStatsPeriod(ids: ObjectId[], dateFrom: Date = new Date(0), dateTo: Date = new Date(Date.now())) {
    const $match: any = {
      createdAt: { 
        $gte: dateFrom,
        $lte: dateTo,
      },
    };

    return this.aggregateStats(ids, $match);
  }

  public async getTournament(tournament: ObjectId) {
    const $match: any = { tournament };

    return this.aggregateStats([], $match);
  }

  private async aggregateStats(ids: ObjectId[], $match: any = {}) {
    if (ids && ids.length) {
      $match.user = { $in: ids } ;
    }
    
    return this.statisticModel.aggregate([
      {
        $match,
      },
      {
        $group: {
          _id: "$user",
          goals: {
            $sum: { $add: ["$mGoals", "$rGoals"] },
          },
          mGoals: {
            $sum: "$mGoals",
          },
          rGoals: {
            $sum: "$rGoals",
          },
          aGoals: {
            $sum: { $add: ["$amGoals", "$arGoals"] },
          },
          amGoals: {
            $sum: "$amGoals",
          },
          arGoals: {
            $sum: "$arGoals",
          },
          blueWon: {
            $sum: {
              $cond: [{ $and: [{ $eq: ["$team", Teams.blue] }, "$won"]}, 1, 0],
            },
          },
          redWon: {
            $sum: {
              $cond: [{ $and: [{ $eq: ["$team", Teams.red] }, "$won"]}, 1, 0],
            },
          },
          blueGames: {
            $sum: {
              $cond: [{ $eq: ["$team", Teams.blue] }, 1, 0],
            },
          },
          redGames: {
            $sum: {
              $cond: [{ $eq: ["$team", Teams.red] }, 1, 0],
            },
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
