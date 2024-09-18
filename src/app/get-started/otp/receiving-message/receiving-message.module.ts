import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceivingMessagePageRoutingModule } from './receiving-message-routing.module';

import { ReceivingMessagePage } from './receiving-message.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivingMessagePageRoutingModule,
    SharedComponentModule
  ],
  declarations: [ReceivingMessagePage]
})
export class ReceivingMessagePageModule { }
