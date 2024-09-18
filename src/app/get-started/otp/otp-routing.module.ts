import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpPage } from './otp.page';

const routes: Routes = [
  {
    path: '',
    component: OtpPage
  },
  {
    path: 'receiving-message',
    loadChildren: () => import('./receiving-message/receiving-message.module').then(m => m.ReceivingMessagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpPageRoutingModule { }
