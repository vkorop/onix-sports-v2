import { TournamentType } from "@components/tournaments/enum/tour-type.enum";

export const sixPlayersTemplate = ([p1, p2, p3, p4]: any[], teams: any[]) => (
  `
Teams (${TournamentType.SIX_PLAYERS}):
${teams.map(({ player1, player2, chance }: any) => 
`
${player1.name} with ${player2.name} (Win chance: ${chance.toFixed(2)}%)
`).join(' ')}

First game:
${p1.name} ${p2.name} vs ${p3.name} ${p4.name}
  `
)