import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveInfoPageRoutingModule } from './receive-info-routing.module';

import { ReceiveInfoPage } from './receive-info.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveInfoPageRoutingModule,
    QRCodeModule
  ],
  declarations: [ReceiveInfoPage]
})
export class ReceiveInfoPageModule { }
