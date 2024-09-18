import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogTransactionsPage } from './log-transactions.page';

const routes: Routes = [
  {
    path: '',
    component: LogTransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogTransactionsPageRoutingModule {}
