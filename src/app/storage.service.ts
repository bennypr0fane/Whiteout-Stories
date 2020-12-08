import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Player } from './player';
import { GameData } from './game-data';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
  }

  public findAll(): Promise<string[]> {
    return this.storage.keys();
  }

  public deleteAll():Promise<void> {
    return this.storage.clear();
  }

  public saveGameData(key: string, value: GameData): Promise<GameData> {
    return this.storage.set(key, value);
  }

  public getGameData(key: string): Promise<GameData> {
    key = key.trim();
    console.log('key after trime *' + key + '*');
    return this.storage.get(key);
  }


}
