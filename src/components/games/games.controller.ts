import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:gameId/info')
  @ApiParam({ name: 'gameId', required: true })
  public async getGameInfo(
    @Param('gameId', ParseObjectIdPipe) gameId: ObjectId,
  ) {
    return this.gameService.getGameInfo(gameId);
  }

  @Post('/create')
  @ApiBody({ type: [CreateGamesDto] })
  public async createGames(@Body() games: CreateGamesDto[]) {
    return this.gameService.createGames(games);
  }

  @Post('/finish')
  @ApiBody({ type: FinishGameDto })
  public async finishGame(@Body() gameInfo: FinishGameDto) {
    return this.gameService.finishGame(gameInfo);
  }
}
