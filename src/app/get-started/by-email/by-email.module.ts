import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ByEmailPageRoutingModule } from './by-email-routing.module';

import { ByEmailPage } from './by-email.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ByEmailPageRoutingModule,
    SharedComponentModule,
  ],
  declarations: [ByEmailPage]
})
export class ByEmailPageModule { }
