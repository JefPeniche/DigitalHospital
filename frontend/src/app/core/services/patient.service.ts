import { HttpClient } from '@angular/common/http';
import { Patient, PatientsResponse } from '../classes/patient';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })

export class PatientService{

  datePipe: DatePipe = new DatePipe('en-US');

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

  getPatient(id: Number){
    return new Promise<Patient>((resolve, reject)=>{
      this.http.get('/api/patients/'+id).toPromise()
      .then( (response)=>{
        resolve(response as Patient)
      }, error=> resolve(error))
    })
  }

  deletePatient(id: number){
    return new Promise((resolve, reject)=>{
      this.http.delete('api/patients/'+id).toPromise()
      .then((response) => {
        resolve(response)
      }, error => {
        reject(error)
      }
      )
    })
  }

  addPatient(formData: FormGroup){
    const data = this.getPatientData(formData);
    return new Promise((resolve, reject)=>{
      this.http.post("/api/patients/",data).toPromise().then(
        response => {
          resolve(response)
        },
        error => reject(error)
      )
    })
  }

  updatePatient(idPatient: Number, formData: FormGroup){
    const data = this.getPatientData(formData);
    return new Promise((resolve, reject)=>{
      this.http.put("/api/patients/"+idPatient,data).toPromise().then(
        response => {
          resolve(response)
        },
        error => reject(error)
      )
    })
  }


  private getPatientData(formData: FormGroup){
    return {
      names: formData.get('names')?.value,
      last_name: formData.get('lastName')?.value,
      second_last_name: formData.get('secondLastName')?.value,
      sex: formData.get('sex')?.value,
      birthday: this.datePipe.transform(formData.get('birthday')?.value, "yyyy-MM-dd"),
      inscription_date: this.datePipe.transform(formData.get('inscriptionDate')?.value, "yyyy-MM-dd"),
      id_hospital: formData.get('idHospital')?.value,
      guardian_name: formData.get('guardianName')?.value,
      guardian_phone: formData.get('guardianPhone')?.value,
    }
  }

}
