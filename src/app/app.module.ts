import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsComponent } from './tabs/tabs.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from './core/http/http.module';

@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    HttpModule.forRoot({ 'hyper': { baseUrl: environment.hyperAPI.baseUrl }, 'roynex': { baseUrl: environment.roynexAPI.baseUrl } }),
    AngularFireAuthModule,
    AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
