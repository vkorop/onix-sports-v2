import { ObjectId } from "mongoose";

export const sixPlayersPlan = (ids: ObjectId[], tournament: ObjectId) => ([
  {
    players: [ids[0], ids[1], ids[2], ids[3]],
    tournament,
  },
  {
    players: [ids[2], ids[3], ids[4], ids[5]],
    tournament,
  },
  {
    players: [ids[4], ids[5], ids[0], ids[1]],
    tournament,
  },
  {
    players: [ids[0], ids[1], ids[2], ids[3]],
    tournament,
  },
  {
    players: [ids[2], ids[3], ids[4], ids[5]],
    tournament,
  },
  {
    players: [ids[4], ids[5], ids[0], ids[1]],
    tournament,
  },
]);