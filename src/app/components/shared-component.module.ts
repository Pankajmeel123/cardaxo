import { NgModule } from '@angular/core';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkeletonCardComponent } from './skeleton-card/skeleton-card.component';
import { SkeletonBigCardComponent } from './skeleton-big-card/skeleton-big-card.component';
import { SelectPopoverComponent } from './select-popover/select-popover.component';

@NgModule({
  declarations: [PrimaryButtonComponent, SkeletonCardComponent, SkeletonBigCardComponent, SelectPopoverComponent],
  exports: [PrimaryButtonComponent, SkeletonCardComponent, SkeletonBigCardComponent, SelectPopoverComponent],
  imports: [IonicModule, CommonModule,
    FormsModule,
    IonicModule,],
})
export class SharedComponentModule { }
