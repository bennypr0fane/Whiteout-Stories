import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }
  next(players:Player[],playerId:number):number{
    return (playerId+1===players.length)? 0:playerId+1;
  }

  initializePlayers(numberOfPlayers:number):Player[]{
    let players = [];
    for(let  i=0; i<numberOfPlayers;i++){
      let player = new Player();
      player.id=i;
      player.color=this.generateColor(i,numberOfPlayers);
      players.push(player);
      console.log('player ' + JSON.stringify(player));
    }
    return players;
  }

  private generateColor(colorNum:number,numberOfDistinctColors:number):string{

   return "hsla(" + ~~( (colorNum+1)*360/numberOfDistinctColors * Math.random()) + "," + "70%,"+ "80%,1)"


  }
}
