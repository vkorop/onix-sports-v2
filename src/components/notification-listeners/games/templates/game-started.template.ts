export const gameStartedTemplate = ({ players, _id }: any) => {
  return `
Game <b>${players[0].name} ${players[1].name}</b> vs <b>${players[2].name} ${players[3].name}</b> started! 
<a href="http://onix-sports.herokuapp.com/games/${_id}/watch">Watch</a>
  `;
};
