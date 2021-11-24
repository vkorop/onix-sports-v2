import { TournamentType } from "@components/tournaments/enum/tour-type.enum";
import { TournamentDocument } from "@components/tournaments/schemas/tournament.schema";

export const fourPlayersTemplate = ({ 
  players: [p1, p2, p3, p4], tournament } : { players: any[], teams: any[], tournament: TournamentDocument
  }) => (
  `
  ===============================
                        ${tournament.title}
                            ${TournamentType.FOUR_PLAYERS}

                                Games
              ${p1.name} ${p2.name} vs ${p3.name} ${p4.name}

              ${p1.name} ${p3.name} vs ${p2.name} ${p4.name}

              ${p1.name} ${p4.name} vs ${p2.name} ${p3.name}
===============================
  `
)