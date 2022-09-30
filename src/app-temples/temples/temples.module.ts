import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplesPageRoutingModule } from './temples-routing.module';

import { TemplesPage } from './temples.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplesPageRoutingModule
  ],
  declarations: [TemplesPage]
})
export class TemplesPageModule {}
