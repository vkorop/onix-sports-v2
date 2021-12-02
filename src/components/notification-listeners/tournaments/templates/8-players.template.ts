import { TournamentType } from "@components/tournaments/enum/tour-type.enum";
import { TournamentDocument } from "@components/tournaments/schemas/tournament.schema";

export const eightPlayersTemplate = ({ 
  players: [p1, p2, p3, p4, p5, p6, p7, p8], teams, tournament } : { players: any[], teams: any[], tournament: TournamentDocument
  }) => (
  `
===============================================
                                    ${tournament.title}
                                        ${TournamentType.EIGHT_PLAYERS}

                                            Teams
                              ${teams.map(({ player1, player2, chance }: any) => 
                              `
                              ${player1.name} with ${player2.name} *${chance.toFixed(2)}%*
                              `).join(' ')}
                                            Group A
                            ${p1.name} ${p2.name} vs ${p3.name} ${p4.name}

                                            Group B
                            ${p5.name} ${p6.name} vs ${p7.name} ${p8.name}
===============================================
  `
)