import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandyPageRoutingModule } from './candy-routing.module';

import { CandyPage } from './candy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandyPageRoutingModule
  ],
  declarations: [CandyPage]
})
export class CandyPageModule {}
