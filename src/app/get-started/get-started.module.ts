import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetStartedPageRoutingModule } from './get-started-routing.module';

import { GetStartedPage } from './get-started.page';
import { PrimaryButtonComponent } from '../components/primary-button/primary-button.component';
import { SharedComponentModule } from '../components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetStartedPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [GetStartedPage]
})
export class GetStartedPageModule { }
