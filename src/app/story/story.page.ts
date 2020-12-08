import { Component, OnInit } from '@angular/core';
import { GameData } from '../game-data';
import { StorageService } from '../storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../player';
import { NgForm } from '@angular/forms';
import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import { Segment } from '../segment';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-story',
  templateUrl: 'story.page.html',

})
export class StoryPage implements OnInit {
  keys: string[];
  gameDataId: string;
  segments: Segment [];
  players: Player[];
  selectedGameId: string;

  constructor(private storageService: StorageService,
              private route: ActivatedRoute,
              private router:Router,
              private playerService: PlayerService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  false;
  }

  ngOnInit() {
    console.log('storyPage ngoninit');
    this.storageService.findAll().then((res) => {console.log('found all keys '+res);this.keys = res});
    this.gameDataId = this.route.snapshot.queryParamMap.get('gameDataId');
    console.log('storyPage this.gameDataId' + this.gameDataId);
    this.showGame(this.gameDataId);
  }

  showGame(key: string) {
    console.log('showgame reached for key *' + key + '*');
    this.storageService.getGameData(key).then(gameData => {
      console.log(' got gamedata for key ' + gameData);
      this.segments = gameData.segments;
      this.players = gameData.players;
    });
  }

}
