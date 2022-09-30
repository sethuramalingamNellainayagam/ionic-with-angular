import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSivanTemplePageRoutingModule } from './add-sivan-temple-routing.module';

import { AddSivanTemplePage } from './add-sivan-temple.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddSivanTemplePageRoutingModule
  ],
  declarations: [AddSivanTemplePage]
})
export class AddSivanTemplePageModule {}
