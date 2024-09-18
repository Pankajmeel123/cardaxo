import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsInfoPage } from './cards-info.page';

const routes: Routes = [
  {
    path: '',
    component: CardsInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsInfoPageRoutingModule {}
