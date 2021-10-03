import { Context, NarrowedContext, Telegraf} from "telegraf";
import * as tt from 'telegraf/src/telegram-types'
import { Update } from "typegram";

export interface NotificationMessage<T> {
  bot: Telegraf<Context<Update>>,
  data: MatchedContext<Context<Update>, "message">
}

type MatchedContext<
  C extends Context,
  T extends tt.UpdateType | tt.MessageSubType
> = NarrowedContext<C, tt.MountMap[T]>