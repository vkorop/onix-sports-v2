import { TournamentType } from "@components/tournaments/enum/tour-type.enum";

export const fourPlayersTemplate = ([p1, p2, p3, p4]: any[]) => (
  `
  Games order (${TournamentType.FOUR_PLAYERS}):
  ${p1.name} ${p2.name} vs ${p3.name} ${p4.name}

  ${p1.name} ${p3.name} vs ${p2.name} ${p4.name}

  ${p1.name} ${p4.name} vs ${p2.name} ${p3.name}
  `
)