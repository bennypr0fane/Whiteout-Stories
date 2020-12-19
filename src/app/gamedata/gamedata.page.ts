import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { GameData } from '../game-data';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { DatePipe } from '@angular/common'
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
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
              private route: ActivatedRoute, private router: Router, private qrScanner: QRScanner) {
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

  launchScanner() {
    // Optionally request the permission early
    this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            // camera permission was granted


            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);

              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
            });

          } else if (status.denied) {
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
          } else {
            // permission was denied, but not permanently. You can ask for permission again at a later time.
          }
        })
        .catch((e: any) => console.log('Error is', e));
  }

}
