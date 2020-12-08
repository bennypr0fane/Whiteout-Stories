import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { GameData } from '../game-data';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-gamedata',
  templateUrl: 'gamedata.page.html'
})

export class GamedataPage implements OnInit {
  zeichenButtonVisible = true;
  zeichenInputVisible = false;
  rundenButtonVisible = true;
  rundenInputVisible = false;
  oderVisible = true;

  gameData: GameData;

  constructor(private datepipe:DatePipe,private storageService: StorageService, private playerService: PlayerService,
              private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  false;
  }


  ngOnInit() {
    console.log('GamedataPage ngOnInit');
    this.gameData = new GameData(this.getNewID());
  }

  getNewID(): string {
   return this.datepipe.transform(new Date(),'dd-MM-yyyy hh:mm:ss');
  }

  save(form: NgForm) {
    const gameData: GameData = form.value;
    gameData.id = this.gameData.id;
    console.log('GamedataPage save gamediatea ' + gameData.id);
    gameData.players = this.playerService.initializePlayers(gameData.numberOfPlayers);
    console.log(JSON.stringify(gameData));

    this.storageService.saveGameData(this.gameData.id, gameData).then(value => {
        console.log('GamedataPage game data saved.');
        this.router.navigate(['players'], { queryParams: { gameDataId: gameData.id } });
      },
      error => console.log('saving game data failed'+error));
  }

  showZeichenInput = () => {
    this.zeichenInputVisible = true;
    this.zeichenButtonVisible = false;
    this.rundenInputVisible = false;
    this.rundenButtonVisible = true;
    this.oderVisible = false;
  }

  showRundenInput = () => {
    this.rundenInputVisible = true;
    this.rundenButtonVisible = false;
    this.zeichenInputVisible = false;
    this.zeichenButtonVisible = true;
    this.oderVisible = false;
  }
}
