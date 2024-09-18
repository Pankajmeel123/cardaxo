import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveInfoPage } from './receive-info.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveInfoPageRoutingModule {}
