import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { MongooseModule } from '@nestjs/mongoose';
import statisticsConstants from './statistics-constants';
import { StatisticSchema } from './schemas/statistic.schema';
import StatisticsRepository from './statistics.repository';
import { GamesModule } from '@components/games/games.module';

@Module({
  imports: [
    GamesModule,
    MongooseModule.forFeature([
      {
        name: statisticsConstants.models.statistics,
        collection: statisticsConstants.models.statistics,
        schema: StatisticSchema,
      },
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsRepository],
  exports: [StatisticsService, StatisticsRepository],
})
export class StatisticsModule {}
