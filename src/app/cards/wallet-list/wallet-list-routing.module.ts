import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletListPage } from './wallet-list.page';

const routes: Routes = [
  {
    path: '',
    component: WalletListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletListPageRoutingModule {}
