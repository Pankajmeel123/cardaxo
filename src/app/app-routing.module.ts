import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { AuthGuard } from './core/guard/auth.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {
    path: '',
    component: TabsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'verify-pin', // Set the default route to 'get-started'
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'cards',
        loadChildren: () => import('./cards/cards.module').then(m => m.CardsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
      },
    ],
  },
  {
    path: 'get-started',
    loadChildren: () => import('./get-started/get-started.module').then(m => m.GetStartedPageModule)
  },
  {
    path: 'verify-pin',
    loadChildren: () => import('./verify-pin/verify-pin.module').then(m => m.VerifyPinPageModule)
  },
  {
    path: 'register',
    component: RegisterComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
