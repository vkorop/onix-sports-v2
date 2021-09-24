import { Game } from "@components/games/core/game.class";
import { GameInfo } from "@components/games/core/interfaces/game-info.interface";
import { GamesService } from "@components/games/games.service";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ObjectId } from "mongodb";
import { ActionRepository } from "./action.repository";

@Injectable()
export class ActionService {
  constructor(
    private readonly actionRepository: ActionRepository,
    private readonly gamesService: GamesService,
  ) {}

  @OnEvent('games.finished', { async: true })
  public async create({ game, info }: { game: Game, info: GameInfo }) {
    const actions = info.actions ? info.actions.map((action) => ({
      ...action,
      game: new ObjectId(game.id),
      player: action.player?._id,
  })): [];  

    const _actions = await this.actionRepository.create(actions);

    await this.gamesService.pushActions(new ObjectId(game.id), _actions.map(({_id}) => _id));

    return _actions;
  }
}