export const tournamentPerformTemplate = ({ goals }: any) => (
`
Statistic was updated.
Click <a href="https://onix-sports.herokuapp.com/statistic/leaderboard">here</a> to check it out!

Best performer: <a href="https://onix-sports.herokuapp.com/statistic/leaderboard">${goals[0].name}</a>
Total goals: ${goals[0].goals}
Goals per game: ${(goals[0].goals / goals[0].games).toFixed(2)}

#bestperformer
#${goals[0].name}
`
)