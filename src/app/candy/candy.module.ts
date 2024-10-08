import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CandyPageRoutingModule } from './candy-routing.module';

import { CandyPage } from './candy.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CandyPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [CandyPage]
})
export class CandyPageModule {}
