import { TournamentType } from "@components/tournaments/enum/tour-type.enum";

export const eightPlayersTemplate = ([p1, p2, p3, p4, p5, p6, p7, p8]: any[], teams: any[]) => (
  `
Teams (${TournamentType.EIGHT_PLAYERS}):
${teams.map(({ player1, player2, chance }: any) => 
`
${player1.name} with ${player2.name} (Win chance: ${chance.toFixed(2)}%)
`).join(' ')}
Group A:
${p1.name} ${p2.name} vs ${p3.name} ${p4.name}

Group B:
${p5.name} ${p6.name} vs ${p7.name} ${p8.name}
  `
)