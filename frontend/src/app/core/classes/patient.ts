export enum sex {  M = 'M', F='F' }

export interface Patient{
  id: number,
  names: string,
  last_name: string,
  second_last_name: string,
  sex: sex,
  age: number,
  birthday: string,
  inscription_date: string,
  guardian_name: string,
  guardian_phone: string,
  id_hospital: number,
  hospital_name: string,
  hospital_city: string,
}


export interface PatientsResponse{
  patients: Array<Patient>
}
