import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageCoinsPage } from './manage-coins.page';

const routes: Routes = [
  {
    path: '',
    component: ManageCoinsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCoinsPageRoutingModule {}
