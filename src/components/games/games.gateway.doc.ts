import { Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { GameEventDto } from "./dto/game-event.dto";
import { GameIdDto } from "./dto/start-game.dto";

@ApiTags('Games Sockets events')
@Controller('sockets')
export class GamesGatewayDoc {
  @ApiBody({ type: GameIdDto })
  @Post('start')
  start() {}

  @ApiBody({ type: GameEventDto })
  @Post('goal')
  goal() {}

  @ApiBody({ type: GameIdDto })
  @Post('pause')
  pause() {}

  @ApiBody({ type: GameIdDto })
  @Post('unpause')
  unpause() {}

  @ApiBody({ type: GameEventDto })
  @Post('swap')
  swap() {}
}