import { Player } from "./player.class";

export class Players {
    players: Player[] = [];

    constructor(players: Player[]) {
        this.players = players;
    }

    public get(id: any) {
        const player = this.players.find(({ _id }: any) => _id == id);

        if (!player) throw new Error('Player was not found');

        return player;
    }

    public toArray() {
        return this.players;
    }
}