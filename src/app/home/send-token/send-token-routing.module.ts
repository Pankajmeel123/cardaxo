import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendTokenPage } from './send-token.page';

const routes: Routes = [
  {
    path: '',
    component: SendTokenPage
  },
  {
    path: 'sending',
    loadChildren: () => import('./sending/sending.module').then( m => m.SendingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendTokenPageRoutingModule {}
