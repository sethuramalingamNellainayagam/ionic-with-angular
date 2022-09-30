import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {path: '', redirectTo: 'page1', pathMatch: 'full'},
  {path: 'page1', component: PagesComponent},
  {path: 'page2', component: PagesComponent},
  {path: 'page3', component: PagesComponent},
  {path: 'page4', component: PagesComponent},
  {path: 'page5', component: PagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
