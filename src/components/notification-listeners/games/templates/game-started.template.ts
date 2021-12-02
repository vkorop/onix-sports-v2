import { MessageArguments } from "@components/common/types/message-arguments.type";
import { Markup } from "telegraf";

export const gameStartedTemplate = ({ players, _id }: any): MessageArguments => {
  return [
    `Game *${players[0].name} ${players[1].name}* vs *${players[2].name} ${players[3].name}* started\\!`,
    { 
      parse_mode: 'MarkdownV2',
      reply_markup: Markup.inlineKeyboard([
        Markup.button.url('Watch', `http://onix-sports.herokuapp.com/games/${_id}/watch`),
        Markup.button.callback('Notify on end', 'notify_on_end'),
      ]).reply_markup
    }
  ];
};
