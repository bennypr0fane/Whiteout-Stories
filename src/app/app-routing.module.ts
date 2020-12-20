import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "gamedata",
    loadChildren: () =>
      import("./gamedata/gamedata.module").then((m) => m.GamedataPageModule),
  },
  {
    path: "players",
    loadChildren: () =>
      import("./players/players.module").then((m) => m.PlayersPageModule),
  },
  {
    path: "segments",
    loadChildren: () =>
      import("./segments/segments.module").then((m) => m.SegmentsPageModule),
  },
  {
    path: "story",
    loadChildren: () =>
      import("./story/story.module").then((m) => m.StoryPageModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
