import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplesPage } from './temples.page';

const routes: Routes = [
  {
    path: '',
    component: TemplesPage,
    children: [
      {
        path: '',
        redirectTo: '/temples',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/temples',
    pathMatch: 'full',
  },
  {
    path: 'sivan276',
    loadChildren: () => import('./sivan276/sivan276.module').then( m => m.Sivan276PageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class TemplesPageRoutingModule {}
