import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@pipes/objectId.pipe';
import { ObjectId } from 'mongodb';
import CreateGamesDto from './dto/create-game.dto';
import FinishGameDto from './dto/finish-game.dto';
import { GamesService } from './games.service';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(
    private readonly gameService: GamesService,
  ) {}

  @Get('/:gameId')
  @ApiParam({ name: 'gameId', type: String })
  public async getGameInfo(
    @Param('gameId', ParseObjectIdPipe) gameId: ObjectId,
  ) {
    return this.gameService.getGameInfo(gameId);
  }

  @Post('/')
  @ApiBody({ type: [CreateGamesDto] })
  public async createGames(@Body() games: CreateGamesDto[]) {
    return this.gameService.createGames(games);
  }
}
