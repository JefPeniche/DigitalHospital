import { HttpClient } from '@angular/common/http';
import { Hospital, HospitalResponse } from '../classes/hospital';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class HospitalService{

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getHospitals(){
    return new Promise<Hospital[]>((resolve, reject)=>{
      this.http.get("/api/hospitals/").toPromise().then(
        response => {
          resolve((response as HospitalResponse).hospitals as Hospital[])
        },
        error => reject(error)
      )
    })
  }

  addHospital(hospital: Hospital){
    const data = {
      name: hospital.name,
      city: hospital.city,
    }
    return new Promise((resolve, reject)=>{
      this.http.post("/api/hospitals/",data).toPromise().then(
        response => {
          resolve((response as Hospital).id)
        },
        error => reject(error)
      )
    })
  }
}
