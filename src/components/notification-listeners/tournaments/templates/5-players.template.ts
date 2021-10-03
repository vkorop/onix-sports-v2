import { TournamentType } from "@components/tournaments/enum/tour-type.enum";

export const fivePlayersTemplate = ([p1, p2, p3, p4, p5]: any[]) => (
  `
  Games order (${TournamentType.FIVE_PLAYERS}):
  ${p1.name} ${p2.name} vs ${p3.name} ${p4.name}

  ${p1.name} ${p4.name} vs ${p2.name} ${p5.name}

  ${p2.name} ${p4.name} vs ${p3.name} ${p5.name}

  ${p1.name} ${p5.name} vs ${p3.name} ${p2.name}

  ${p1.name} ${p3.name} vs ${p5.name} ${p4.name}
  `
)