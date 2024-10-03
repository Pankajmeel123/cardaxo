import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CandyPage } from './candy.page';

const routes: Routes = [
  {
    path: '',
    component: CandyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandyPageRoutingModule {}
