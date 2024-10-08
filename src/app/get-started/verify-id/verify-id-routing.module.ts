import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyIdPage } from './verify-id.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyIdPage
  },
  {
    path: 'document',
    loadChildren: () => import('./document/document.module').then( m => m.DocumentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyIdPageRoutingModule {}
