import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody,  } from '@nestjs/swagger';
import CreateGamesDto from './dto/create-game.dto';
import FinishGameDto from './dto/finish-game.dto';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(
    private readonly gameService: GamesService,
  ) {}

  @Post('/create')
  public async createGames(@Body() games: CreateGamesDto[]) {
    return this.gameService.createGames(games);
  }

  @Post('/finish')
  public async finishGame(@Body() gameInfo: FinishGameDto) {
    return this.gameService.finishGame(gameInfo);
  }
}
