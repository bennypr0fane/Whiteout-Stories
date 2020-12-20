import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { GamedataPage } from "./gamedata.page";
import { RouterModule } from "@angular/router";
import { GamedataPageRoutingModule } from "./gamedata-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    GamedataPageRoutingModule,
  ],
  declarations: [GamedataPage],
})
export class GamedataPageModule {}
