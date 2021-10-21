import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseDatePipe } from '@pipes/date.pipe';
import { ParseObjectIdPipe } from '@pipes/objectId.pipe';
import { ObjectIdsPipe } from '@pipes/objectIds.pipe';
import { ObjectId } from 'mongodb';
import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticService: StatisticsService,
  ) {}

  @ApiQuery({ name: 'ids', type: [String], required: false })
  @ApiQuery({ name: 'dateFrom', type: Number, required: false })
  @ApiQuery({ name: 'dateTo', type: Number, required: false })
  @Get('/')
  public getStats(
    @Query('ids', ObjectIdsPipe) ids: ObjectId[],
    @Query('dateFrom', ParseDatePipe) dateFrom: Date,
    @Query('dateTo', ParseDatePipe) dateTo: Date,
  ) {
    return this.statisticService.getStatsPeriod(ids, dateFrom, dateTo);
  }

  @Get('/leaderboard')
  public getLeaderboard() {
    return this.statisticService.getLeaderboard();
  }

  @ApiParam({
    name: 'tournament',
    type: String,
  })
  @Get('/:tournament')
  public getTournamentStats(
    @Param('tournament', ParseObjectIdPipe) id: ObjectId,
  ) {
    return this.statisticService.getTournamentStats(id);
  }
}
