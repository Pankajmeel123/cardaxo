import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletListPageRoutingModule } from './wallet-list-routing.module';

import { WalletListPage } from './wallet-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletListPageRoutingModule
  ],
  declarations: [WalletListPage]
})
export class WalletListPageModule {}
