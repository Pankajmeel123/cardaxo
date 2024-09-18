import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendingPageRoutingModule } from './sending-routing.module';

import { SendingPage } from './sending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendingPageRoutingModule
  ],
  declarations: [SendingPage]
})
export class SendingPageModule {}
