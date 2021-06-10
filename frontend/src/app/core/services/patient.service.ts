import { HttpClient } from '@angular/common/http';
import { Patient, PatientsResponse } from '../classes/patient';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class PatientService{

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getPatients(){
    return new Promise<Patient[]>((resolve, reject) => {
    this.http.get('api/patients/').toPromise()
      .then( (response) => {
        resolve( (response as PatientsResponse).patients )
      }, (error) => {
        reject(error);
      })
    })
  }
}
