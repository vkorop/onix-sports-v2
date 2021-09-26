import { Body, Controller, Get, ParseArrayPipe, Post, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
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

  @ApiQuery({ name: 'ids', type: [String], required: false })
  @ApiQuery({ name: 'dateFrom', type: Number, required: false })
  @ApiQuery({ name: 'dateTo', type: Number, required: false })
  @Get('/')
  public getStats(
    @Query('ids', ObjectIdsPipe) ids: ObjectId[],
    @Query('dateFrom', ParseDatePipe) dateFrom: Date,
    @Query('dateTo', ParseDatePipe) dateTo: Date,
  ) {
    return this.statisticService.getStats(ids, dateFrom, dateTo);
  }
}
