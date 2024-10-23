import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsPage } from './cards.page';
import { CardGuard } from '../core/guard/card.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [CardGuard],
    component: CardsPage
  },
  {
    path: 'application',
    // canActivate: [CardGuard],
    loadChildren: () => import('./application/application.module').then(m => m.ApplicationPageModule)
  },
  {
    path: 'card-list',
    // canActivate: [CardGuard],
    loadChildren: () => import('./card-list/card-list.module').then(m => m.CardListPageModule)
  },
  {
    path: 'activation',
    // canActivate: [CardGuard],
    loadChildren: () => import('./activation/activation.module').then(m => m.ActivationPageModule)
  },
  {
    path: 'cards-info',
    loadChildren: () => import('./cards-info/cards-info.module').then(m => m.CardsInfoPageModule)
  },
  {
    path: 'wallet-list',
    loadChildren: () => import('./wallet-list/wallet-list.module').then( m => m.WalletListPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsPageRoutingModule { }
