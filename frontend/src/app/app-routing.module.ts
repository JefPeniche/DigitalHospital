import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientService } from './core/services/patient.service';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})

export class AppRoutingModule { }
