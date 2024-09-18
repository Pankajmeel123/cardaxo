import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogTransactionsPageRoutingModule } from './log-transactions-routing.module';

import { LogTransactionsPage } from './log-transactions.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogTransactionsPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [LogTransactionsPage]
})
export class LogTransactionsPageModule { }
