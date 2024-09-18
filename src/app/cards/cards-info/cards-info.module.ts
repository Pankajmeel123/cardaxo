import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardsInfoPageRoutingModule } from './cards-info-routing.module';

import { CardsInfoPage } from './cards-info.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardsInfoPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [CardsInfoPage]
})
export class CardsInfoPageModule { }
