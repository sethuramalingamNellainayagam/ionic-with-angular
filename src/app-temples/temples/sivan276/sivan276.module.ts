import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Sivan276PageRoutingModule } from './sivan276-routing.module';

import { Sivan276Page } from './sivan276.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Sivan276PageRoutingModule
  ],
  declarations: [Sivan276Page]
})
export class Sivan276PageModule {}
