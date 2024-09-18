import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterCodePageRoutingModule } from './enter-code-routing.module';

import { EnterCodePage } from './enter-code.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterCodePageRoutingModule,
    SharedComponentModule,
  ],
  declarations: [EnterCodePage]
})
export class EnterCodePageModule { }
