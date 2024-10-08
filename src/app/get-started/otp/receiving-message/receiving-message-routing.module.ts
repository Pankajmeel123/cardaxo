import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivingMessagePage } from './receiving-message.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivingMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivingMessagePageRoutingModule {}
