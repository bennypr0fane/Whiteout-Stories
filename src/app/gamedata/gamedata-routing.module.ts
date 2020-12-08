import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamedataPage } from './gamedata.page';

const routes: Routes = [
  {
    path: '',
    component: GamedataPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamedataPageRoutingModule {}
