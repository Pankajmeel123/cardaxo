import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechargePage } from './recharge.page';

const routes: Routes = [
  {
    path: '',
    component: RechargePage
  },
  {
    path: 'pay',
    loadChildren: () => import('./pay/pay.module').then(m => m.PayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechargePageRoutingModule { }
