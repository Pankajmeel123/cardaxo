import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendingPage } from './sending.page';

const routes: Routes = [
  {
    path: '',
    component: SendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendingPageRoutingModule {}
