import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfig } from './http.model';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class HttpModule {
  static forRoot(apiConfig: ApiConfig): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
      providers: [
        { provide: 'API_CONFIG', useValue: apiConfig },
      ],
    }
  }
}
