import { Body, Controller, Get, ParseArrayPipe, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ParseDatePipe } from '@pipes/date.pipe';
import { ObjectIdsPipe } from '@pipes/objectIds.pipe';
import { ObjectId } from 'mongodb';
import CreateStatsDto from './dto/create-stats.dto';
import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticService: StatisticsService,
  ) {}

  @Post('/save')
  @ApiBody({ type: [CreateStatsDto] })
  public async saveStats(@Body() stats: CreateStatsDto[]) {
    return this.statisticService.saveStats(stats);
  }

  @Get('/get')
  public getStats(
    @Query('ids', ObjectIdsPipe) ids: ObjectId[],
    @Query('dateFrom', ParseDatePipe) dateFrom: Number,
    @Query('dateTo', ParseDatePipe) dateTo: Number,
  ) {
    return this.statisticService.getStats(ids, dateFrom, dateTo);
  }
}
