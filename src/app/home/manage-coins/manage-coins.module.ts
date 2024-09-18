import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageCoinsPageRoutingModule } from './manage-coins-routing.module';

import { ManageCoinsPage } from './manage-coins.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageCoinsPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [ManageCoinsPage]
})
export class ManageCoinsPageModule { }
