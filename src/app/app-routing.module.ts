import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { AuthGuard } from './core/guard/auth.guard';

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
      {
        path: 'candy',
        loadChildren: () => import('./candy/candy.module').then( m => m.CandyPageModule)
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
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'invite',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then( m => m.TermsAndConditionsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
