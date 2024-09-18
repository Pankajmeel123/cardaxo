import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveTokenPage } from './receive-token.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveTokenPage
  },
  {
    path: 'receive-info',
    loadChildren: () => import('./receive-info/receive-info.module').then(m => m.ReceiveInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiveTokenPageRoutingModule { }
