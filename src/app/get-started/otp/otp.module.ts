import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpPageRoutingModule } from './otp-routing.module';

import { OtpPage } from './otp.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { IonicSelectableComponent, IonicSelectableItemTemplateDirective, IonicSelectablePlaceholderTemplateDirective, IonicSelectableTitleTemplateDirective, IonicSelectableValueTemplateDirective } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpPageRoutingModule,
    SharedComponentModule,
    IonicSelectableComponent,
    IonicSelectableItemTemplateDirective,
    IonicSelectableValueTemplateDirective,
    IonicSelectablePlaceholderTemplateDirective,
    IonicSelectableTitleTemplateDirective
  ],
  declarations: [OtpPage]
})
export class OtpPageModule { }
