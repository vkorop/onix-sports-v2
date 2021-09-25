import { ObjectId } from "mongoose";

export const fivePlayersPlan = (ids: ObjectId[], tournament: ObjectId) => ([
  {
    players: [ids[0], ids[1], ids[2], ids[3]],
    tournament,
  },
  {
    players: [ids[0], ids[3], ids[1], ids[4]],
    tournament,
  },
  {
    players: [ids[1], ids[3], ids[2], ids[4]],
    tournament,
  },
  {
    players: [ids[0], ids[4], ids[2], ids[1]],
    tournament,
  },
  {
    players: [ids[0], ids[2], ids[4], ids[3]],
    tournament,
  },
]);