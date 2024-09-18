import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { RechargeGuard } from '../core/guard/recharge.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'manage-coins',
    loadChildren: () => import('./manage-coins/manage-coins.module').then(m => m.ManageCoinsPageModule)
  },
  {
    path: 'receive-token',
    loadChildren: () => import('./receive-token/receive-token.module').then(m => m.ReceiveTokenPageModule)
  },
  {
    path: 'send-token',
    loadChildren: () => import('./send-token/send-token.module').then(m => m.SendTokenPageModule)
  },
  {
    path: 'recharge',
    canActivate: [RechargeGuard],
    loadChildren: () => import('./recharge/recharge.module').then(m => m.RechargePageModule)
  },
  {
    path: 'log-transactions',
    loadChildren: () => import('./log-transactions/log-transactions.module').then( m => m.LogTransactionsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
