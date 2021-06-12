export interface Hospital{
  id: number,
  name: string,
  city: string,
}


export interface HospitalResponse{
  hospitals: Array<Hospital>
}
