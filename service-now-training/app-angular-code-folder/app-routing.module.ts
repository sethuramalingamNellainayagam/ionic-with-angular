import { ChildModule } from './child/child.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectivesComponent } from './components/directives/directives.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: DirectivesComponent,
//   },
//   {
//     path: 'parent',
//     component: ParentComponent,
//   },
//   {
//     path: 'child',
//     component: ChildComponent,
//   },
// ];
//lazy loading
const routes: Routes = [
  {
    path: '',
    component: DirectivesComponent,
  },
  {
    path: 'parent',
    loadChildren: () => import('../app/parent/parent.module').then(m => m.ParentModule)
  },
  {
    path: 'child',
    loadChildren: () => import('../app/child/child.module').then(m => m.ChildModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
