import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsInputComponent } from './persons-input/persons-input.component';
import { PersonsComponent } from './persons/persons.component';

const routes: Routes = [
  { path: '', component: PersonsComponent },
  { path: 'add', component: PersonsInputComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
