import { Component, OnInit } from '@angular/core';
import { Patient } from './core/classes/patient';
import { registerLocaleData} from '@angular/common'
import { PatientService } from './core/services/patient.service';

import localeEsMx from '@angular/common/locales/es-MX';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PatientService]
})

export class AppComponent implements OnInit{

  patients: Array<Patient> = [];

  constructor( private patientService: PatientService){}

  ngOnInit(){
    registerLocaleData(localeEsMx);

    this.patientService.getPatients().then(
      response => {
        console.log(response);

        this.patients =response;
      },error => {
        console.error(error);
      }
    )
  }

}
