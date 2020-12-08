import {Segment} from './segment';
import {Player} from './player';

export class GameData {
    segments: Segment [] ;
    players: Player [] ;
    numberOfPlayers: number;
    numberOfRounds: number;
    characterLimit: number;
    activeRoundCount: number;


    constructor(public id: string) {
      console.log('constructor GameData ');

    }
}
