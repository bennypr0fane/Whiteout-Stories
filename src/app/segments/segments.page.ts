import { Component, OnInit } from '@angular/core';
import { GameData } from '../game-data';
import { StorageService } from '../storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../player';
import { NgForm } from '@angular/forms';
import { JsonObject } from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import { Segment } from '../segment';
import { PlayerService } from '../player.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-segments',
  templateUrl: 'segments.page.html'

})
export class SegmentsPage implements OnInit{
  gameDataId:string;
  playerId:number;
  previousSegment:Segment;
  segment: Segment = new Segment();
  previousPlayer:Player=null;
  player:Player;
  constructor( private storageService: StorageService,
               private route:ActivatedRoute,
               private router:Router,
               private playerService: PlayerService,
               private alertController: AlertController) {
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  false;

  }

  ngOnInit() {

    this.gameDataId = this.route.snapshot.queryParamMap.get('gameDataId');
    console.log(' SegmentsPage ngOnInit ' + this.gameDataId);
    this.refresh( Number(this.route.snapshot.queryParamMap.get('playerId')));
  }

  private refresh(playerId:number) {
    this.playerId =playerId;
    console.log(' SegmentsPage got gameDataId ' + this.gameDataId + ' playerId ' + this.playerId);
    if(this.segment) {
      this.segment.content = '';
    }
    this.storageService.getGameData(this.gameDataId).then(gameData => {
      this.previousPlayer = this.player;
      console.log(' refresh previous player ' + this.previousPlayer);
      this.player = gameData.players[this.playerId];
      console.log('got player from storage ' + JSON.stringify(this.player));
      this.previousSegment = gameData.segments ? gameData.segments.slice(-1)[0] : null;
    })
  }

  save(form:NgForm){
    let segment:Segment=form.value;
    console.log('SegmentsPage got segment from form ' + JSON.stringify(segment));
    this.storageService.getGameData(this.gameDataId).then(value => this.storageService
      .saveGameData(this.gameDataId,this.addSegment(value, segment)))
      .then(value => this.refresh(this.playerService.next(value.players,this.playerId)));
  }


  showConfirm() {
    this.alertController.create({
      header: 'Bist du sicher?',
      message: 'You want to end the game and reveal the entire story?',
      buttons: [
        {
          text: 'Ja',
          handler: () => {
            console.log('User wants to finish'+this.gameDataId);
            return this.router.navigate(['story'],{queryParams:{gameDataId:this.gameDataId}});

          }
        },
        {
          text: 'Nein!',
          handler: () => {
            console.log('User changed his mind');
            return false;
          }
        }
      ]
    }).then(res => {
      console.log(' in present ');
      res.present();
    });
  }

  limitReached(){

  }
  addSegment(gameData:GameData,segmentFromForm:Segment):GameData{
    let segment:Segment = new Segment();
    segment.content=segmentFromForm.content;
    segment.date= new Date();
    segment.playerId=this.playerId;
    if(!gameData.segments){
      console.log(' segments was undefined, initializing it');
      gameData.segments=[];
    }
    gameData.segments.push(segment);
    return gameData;
  }
}
