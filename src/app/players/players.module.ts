import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlayersPage } from './players.page';
import { PlayersPageRoutingModule } from './players-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlayersPageRoutingModule
  ],
  declarations: [PlayersPage]
})
export class PlayersPageModule {}
