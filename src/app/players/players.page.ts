import { Component, OnInit } from '@angular/core';
import { GameData } from '../game-data';
import { StorageService } from '../storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../player';
import { NgForm } from '@angular/forms';
import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';


@Component({
  selector: 'app-players',
  templateUrl: 'players.page.html'

})
export class PlayersPage implements OnInit{
  gameDataId:string;

  players:Player[];
  constructor( private storageService: StorageService,
               private route:ActivatedRoute,private router:Router,
              ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  false;
  }

  ngOnInit() {

    this.gameDataId = this.route.snapshot.queryParamMap.get('gameDataId');
    console.log(' PlayersPage ngOnInit got gameDataId ' + this.gameDataId);
    this.storageService.getGameData(this.gameDataId).then(value => {
      this.players = value.players;
      console.log('got players from storage: id ' + value.id + ' : ' + JSON.stringify(this.players));
    })
  }

  save(form:NgForm){
    let players=form.value;
    console.log('PlayersPage got players from form ' + JSON.stringify(players));
    this.storageService.getGameData(this.gameDataId).then(value => this.storageService
      .saveGameData(this.gameDataId,this.copyNamesInPlayers(value, players))).then(value =>
      this.router.navigate(['segments'],{queryParams:{gameDataId:this.gameDataId,playerId:0}}));
  }

  copyNamesInPlayers(gameData:GameData,playersFromForm:JsonObject):GameData{
    for( var player of gameData.players){
      player.name= playersFromForm[("name" + player.id)].toString();
      console.log('PlayersPage copynames ' + JSON.stringify(player));
    }
    return gameData;
  }
}
