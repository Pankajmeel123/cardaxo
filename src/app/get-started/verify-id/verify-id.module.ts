import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyIdPageRoutingModule } from './verify-id-routing.module';

import { VerifyIdPage } from './verify-id.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyIdPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [VerifyIdPage]
})
export class VerifyIdPageModule { }
