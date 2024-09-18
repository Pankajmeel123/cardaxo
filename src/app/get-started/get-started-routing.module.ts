import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetStartedPage } from './get-started.page';

const routes: Routes = [
  {
    path: '',
    component: GetStartedPage
  },
  {
    path: 'verify-id',
    loadChildren: () => import('./verify-id/verify-id.module').then(m => m.VerifyIdPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'by-email',
    loadChildren: () => import('./by-email/by-email.module').then( m => m.ByEmailPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetStartedPageRoutingModule { }
