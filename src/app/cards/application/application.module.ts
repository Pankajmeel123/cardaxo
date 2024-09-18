import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplicationPageRoutingModule } from './application-routing.module';

import { ApplicationPage } from './application.page';
import { IonicSelectableComponent, IonicSelectableItemTemplateDirective, IonicSelectablePlaceholderTemplateDirective, IonicSelectableTitleTemplateDirective, IonicSelectableValueTemplateDirective } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationPageRoutingModule,
    IonicSelectableComponent,
    IonicSelectableItemTemplateDirective,
    IonicSelectableValueTemplateDirective,
    IonicSelectablePlaceholderTemplateDirective,
    IonicSelectableTitleTemplateDirective
  ],
  declarations: [ApplicationPage]
})
export class ApplicationPageModule { }
