import { Markup } from "telegraf";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

export const gameStartedTemplate = ({ players, _id }: any): [string, ExtraReplyMessage] => {
  return [
    `Game *${players[0].name} ${players[1].name}* vs *${players[2].name} ${players[3].name}* started\\!`,
    { 
      parse_mode: 'MarkdownV2',
      reply_markup: Markup.inlineKeyboard([
        Markup.button.url('Watch', `http://onix-sports.herokuapp.com/games/${_id}/watch`)
      ]).reply_markup
    }
  ];
};
