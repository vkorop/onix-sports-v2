import { TournamentType } from "@components/tournaments/enum/tour-type.enum";

export const eightPlayersTemplate = ([p1, p2, p3, p4, p5, p6, p7, p8]: any[]) => (
  `
  Games order (${TournamentType.EIGHT_PLAYERS}):
  ${p1.name} ${p2.name} vs ${p3.name} ${p4.name}

  ${p5.name} ${p6.name} vs ${p7.name} ${p8.name}

  Losers vs Losers

  Winners vs Winners
  `
)