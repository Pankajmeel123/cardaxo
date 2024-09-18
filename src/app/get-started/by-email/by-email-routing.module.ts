import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ByEmailPage } from './by-email.page';

const routes: Routes = [
  {
    path: '',
    component: ByEmailPage
  },
  {
    path: 'enter-code',
    loadChildren: () => import('./enter-code/enter-code.module').then( m => m.EnterCodePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ByEmailPageRoutingModule {}
