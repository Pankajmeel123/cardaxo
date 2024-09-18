import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendTokenPageRoutingModule } from './send-token-routing.module';

import { SendTokenPage } from './send-token.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendTokenPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [SendTokenPage]
})
export class SendTokenPageModule { }
