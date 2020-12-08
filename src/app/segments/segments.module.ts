import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SegmentsPage } from './segments.page';
import { SegmentsPageRoutingModule } from './segments-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SegmentsPageRoutingModule
  ],
  declarations: [SegmentsPage]
})
export class SegmentsPageModule {}
