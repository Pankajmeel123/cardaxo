import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceiveTokenPageRoutingModule } from './receive-token-routing.module';

import { ReceiveTokenPage } from './receive-token.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceiveTokenPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [ReceiveTokenPage]
})
export class ReceiveTokenPageModule { }
