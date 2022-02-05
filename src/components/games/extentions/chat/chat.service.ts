import { Action } from "@components/games/core/action.class";
import { IActionEventData } from "@components/games/core/interfaces/action-event-data.interface";
import { GameInfo } from "@components/games/core/interfaces/game-info.interface";
import { ActionType } from "@components/games/enum/action-type.enum";
import { GamesGateway } from "@components/games/games.gateway";
import { gameEvent } from "@components/games/utils/event.util";
import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { IExtention } from "../interfaces/extention.interface";
import { authors } from "./authors";
import { IGetRandomMessageResult } from "./interfaces/chat-extention.interfaces";
import { IMessage } from "./interfaces/message.interface";
import { Message, messages } from "./messages";

@Injectable()
export class ChatExtention implements IExtention {
  constructor(
    private readonly gameGateway: GamesGateway,
  ) {}

  private readonly logger: Logger = new Logger(ChatExtention.name);
  private readonly chats: {[key: string]: { messages: IMessage[], info?: GameInfo, interval: number, actions?: Action[] }} = {};

  @OnEvent('game.started')
  private handleStart({ id, info }: { id: string, info: GameInfo }) {
    this.gameGateway.emiter.on(gameEvent(id, 'action'), this.handleAction.bind(this));

    const interval = setInterval(this.chatAI.bind(this), 100, id);

    this.chats[id] = { messages: [], interval, info, actions: info.actions };
  }

  @OnEvent('game.finished')
  private handleFinish({ id }: { id: string }) {
    this.gameGateway.emiter.off(gameEvent(id, 'action'), this.handleAction.bind(this));

    clearInterval(this.chats[id].interval);

    delete this.chats[id];
  }

  private handleAction(data: IActionEventData) {
    this.chats[data.info.id].info = data.info;
    this.chats[data.info.id].actions = data.actions;
  }

  private chatAI(id: string) {
    const { actions } = this.chats[id];

    if (!actions) return;

    const lastAction = actions[actions.length - 1];
    let messagesArray: Message[] = [];

    if (Date.now() - lastAction.time.valueOf() < 2000) {
      switch (lastAction.type) {
        case ActionType.MGOAL: messagesArray = messages[ActionType.MGOAL]; break;
        case ActionType.RGOAL: messagesArray = messages[ActionType.RGOAL]; break;
        case ActionType.START: messagesArray = messages[ActionType.START]; break;
      }
    } else if (Math.random() > .95) {
      messagesArray = messages.idle;
    }

    if (!messagesArray.length) return;

    const text = messagesArray[Math.floor(Math.random() * messagesArray.length)](lastAction?.player?.name);
    const author = authors[Math.floor(Math.random() * authors.length)];

    this.gameGateway.server.emit('chat.message', { 
      text, author, time: new Date(),
     });
  }
}