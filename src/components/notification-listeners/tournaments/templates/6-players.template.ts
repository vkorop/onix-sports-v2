import { TournamentType } from "@components/tournaments/enum/tour-type.enum";
import { TournamentDocument } from "@components/tournaments/schemas/tournament.schema";

export const sixPlayersTemplate = ({ 
  players: [p1, p2, p3, p4], teams, tournament } : { players: any[], teams: any[], tournament: TournamentDocument
  }) => (
  `
===============================================
                                    ${tournament.title}
                                      ${TournamentType.SIX_PLAYERS}

                                            Teams
                          ${teams.map(({ player1, player2, chance }: any) => 
                          `
                                ${player1.name} with ${player2.name} *${chance.toFixed(2)}%*
                          `).join(' ')}

                                          First game
                            ${p1.name} ${p2.name} vs ${p3.name} ${p4.name}
===============================================
  `
)