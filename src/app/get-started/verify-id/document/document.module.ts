import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentPageRoutingModule } from './document-routing.module';

import { DocumentPage } from './document.page';
import { SharedComponentModule } from 'src/app/components/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [DocumentPage]
})
export class DocumentPageModule { }
