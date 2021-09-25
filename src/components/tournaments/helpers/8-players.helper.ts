import { ObjectId } from "mongoose";

export const eightPlayersPlan = (ids: ObjectId[], tournament: ObjectId) => ([
  {
    players: [ids[0], ids[1], ids[2], ids[3]],
    tournament,
  },
  {
    players: [ids[4], ids[5], ids[6], ids[7]],
    tournament,
  },
  {
    players: [ids[0], ids[1], ids[4], ids[5]],
    tournament,
  },
  {
    players: [ids[2], ids[3], ids[6], ids[7]],
    tournament,
  },
  {
    players: [ids[0], ids[1], ids[6], ids[7]],
    tournament,
  },
  {
    players: [ids[2], ids[3], ids[4], ids[5]],
    tournament,
  },
]);