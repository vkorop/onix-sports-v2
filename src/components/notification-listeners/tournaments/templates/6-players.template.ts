import { TournamentType } from "@components/tournaments/enum/tour-type.enum";

export const sixPlayersTemplate = ([p1, p2, p3, p4, p5, p6]: any[]) => (
  `
  Games order (${TournamentType.SIX_PLAYERS}):
  ${p1.name} ${p2.name} vs ${p3.name} ${p4.name}

  ${p5.name} ${p6.name} vs Losers

  ${p5.name} ${p6.name} vs Winners
  `
)