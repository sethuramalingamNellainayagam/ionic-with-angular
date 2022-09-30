import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddSivanTemplePage } from './add-sivan-temple.page';

const routes: Routes = [
  {
    path: '',
    component: AddSivanTemplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSivanTemplePageRoutingModule {}
