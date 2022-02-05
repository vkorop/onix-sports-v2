import { ActionType } from "@components/games/enum/action-type.enum";

export type Message = (player: string) => string;

export const messages = {
  [ActionType.MGOAL]: [
    (player: string) => `ХАРООООШ`,
    (player: string) => `${player} ЛУЧШИЙ ФОРВАРД`,
    (player: string) => `ТУДА ИХ`,
    (player: string) => `Я также могу..`,
    (player: string) => `Дешевый гол`,
    (player: string) => `ДУШИТЕ ИХ`,
    (player: string) => `КАК????`,
    (player: string) => `СУДЬЮ НА МЫЛО!`,
    (player: string) => `ДЫРКА НА ВОРОТАХ`,
    (player: string) => `Я что то пропустил?`,
  ],
  [ActionType.RGOAL]: [
    (player: string) => `МОООООООЩЬ`,
    (player: string) => `${player} ЛУЧШИЙ ВРАТАРЬ`,
    (player: string) => `ТУДА ИХ`,
    (player: string) => `Я также могу..`,
    (player: string) => `От ворот до ворот не считается`,
    (player: string) => `${player} КРАСАВА`,
    (player: string) => `КАК????`,
    (player: string) => `ЧТО ЗА РИКОШЕТЫ?!`,
    (player: string) => `ДЫРКА НА ВОРОТАХ`,
    (player: string) => `Я что то пропустил?`,
  ],
  [ActionType.START]: [
    (player: string) => `ПОГНАЛИ!`,
    (player: string) => `Я ЗА СИНИХ`,
    (player: string) => `Я ЗА КРАСНЫХ`,
    (player: string) => `С ДЕТСТВА ЗА СИНИХ`,
    (player: string) => `С ДЕТСТВА ЗА КРАСНЫХ`,
    (player: string) => `ПОЛЕТЕЛИ`,
    (player: string) => `Ничего не видно`,
    (player: string) => `Гоу гоу гоу!`,
    (player: string) => `ГДЕ ГОЛЫ?`,
    (player: string) => `ГОООООООООООООО!`,
  ],
  idle: [
    (player: string) => `ДАВАЙ ДАВАЙ`,
    (player: string) => `Где голы?`,
    (player: string) => `Когда нави играют?`,
    (player: string) => `Где баскетбол?`,
    (player: string) => `ОЛЕНИ!`,
    (player: string) => `Скучная игра...`,
    (player: string) => `НУ ЖЕ!`,
    (player: string) => `ПАС!`,
    (player: string) => `БЕЙ!`,
    (player: string) => `ДА ЗАБЕЙ ТЫ УЖЕ!`,
  ],
};