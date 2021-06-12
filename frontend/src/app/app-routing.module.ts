import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { ListPatientComponent } from './list-patient/list-component.component';
const routes: Routes = [
  { path: '', component: ListPatientComponent},
  { path: 'edit', component: EditPatientComponent},
  { path: 'edit/:id', component: EditPatientComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
