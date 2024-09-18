import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyPinPageRoutingModule } from './verify-pin-routing.module';

import { VerifyPinPage } from './verify-pin.page';
import { SharedComponentModule } from '../components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyPinPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [VerifyPinPage]
})
export class VerifyPinPageModule { }
