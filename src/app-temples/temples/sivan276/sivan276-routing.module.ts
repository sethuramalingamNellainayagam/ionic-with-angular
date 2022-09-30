import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sivan276Page } from './sivan276.page';

const routes: Routes = [
  {
    path: '',
    component: Sivan276Page
  },
  {
    path: 'add-sivan-temple',
    loadChildren: () => import('./add-sivan-temple/add-sivan-temple.module').then( m => m.AddSivanTemplePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sivan276PageRoutingModule {}
