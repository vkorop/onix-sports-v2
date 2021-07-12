import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import CreateStatsDto from './dto/create-stats.dto';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(
    private readonly statisticService: StatisticsService,
  ) {}

  @Post('/save')
  public async saveStats(@Body() stats: CreateStatsDto[]) {
    return this.statisticService.saveStats(stats);
  }

  @Get('/get')
  public getStats(
    @Query('ids') ids: string,
    @Query('dateFrom') dateFrom: string,
    @Query('dateTo') dateTo: string,
  ) {
    return this.statisticService.getStats(ids, dateFrom, dateTo);
  }
}
