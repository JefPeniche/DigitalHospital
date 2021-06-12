import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Hospital } from '../core/classes/hospital';
import {HospitalService} from '../core/services/hospital.service'
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PatientService } from '../core/services/patient.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css'],
  providers: [HospitalService, PatientService],
})


export class EditPatientComponent implements OnInit {

  patientForm = new FormGroup({
    names: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    secondLastName: new FormControl('', Validators.required),
    sex: new FormControl('F', Validators.required),
    birthday: new FormControl('', Validators.required),
    inscriptionDate: new FormControl('', Validators.required),
    idHospital: new FormControl(''),
    hospitalCity: new FormControl('', Validators.required),
    guardianName: new FormControl('', Validators.required),
    guardianPhone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
  })

  hospitalName= new FormControl('', Validators.required);
  hospitals: Array<Hospital> = [];
  filteredHospitals: Observable<Hospital[]> = new Observable();
  idPatient: Number = 0;

  constructor(private hospitalService: HospitalService, private router: Router, private activatedRouter: ActivatedRoute,
    private patientService: PatientService, private snackbar: MatSnackBar ) {
    this.filteredHospitals = this.hospitalName.valueChanges
    .pipe(
      startWith(''),
      map(hospital => hospital ? this.hospitalsFilter(hospital) : this.hospitals.slice())
    );
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe( (params: ParamMap) => {
      this.idPatient = Number(params.get("id"));
    });
    if(this.idPatient) this.getPatient();
    this.getHospitals();

  }

  getPatient(){
    this.patientService.getPatient(this.idPatient).then(
      response => {
        this.patientForm.get('names')?.setValue(response.names);
        this.patientForm.get('lastName')?.setValue(response.last_name);
        this.patientForm.get('secondLastName')?.setValue(response.second_last_name);
        this.patientForm.get('sex')?.setValue(response.sex);
        this.patientForm.get('birthday')?.setValue(response.birthday);
        this.patientForm.get('inscriptionDate')?.setValue(response.inscription_date);
        this.patientForm.get('idHospital')?.setValue(response.id_hospital);
        this.hospitalName.setValue(response.hospital_name);
        this.patientForm.get('hospitalCity')?.setValue(response.hospital_city);
        this.patientForm.get('guardianName')?.setValue(response.guardian_name);
        this.patientForm.get('guardianPhone')?.setValue(response.guardian_phone);
      },
      error => console.error(error)
    )
  }

  getHospitals(){
    this.hospitalService.getHospitals().then(
      response => {
        this.hospitals = response;
      },
      error => console.error(error)
    )
  }

  hospitalsFilter(value: string): Hospital[] {
    const filterValue = value.toLowerCase();
    return this.hospitals.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onHospitalChange(event: MatAutocompleteSelectedEvent){
    const hospitalInfo = event.option.id.split('|');
    this.patientForm.get('idHospital')?.setValue(hospitalInfo[0]);
    this.patientForm.get('hospitalCity')?.setValue(hospitalInfo[1]);
  }

  onSubmit(){
    if(this.patientForm.valid){
      const hospitalSelected = this.hospitals.find(
        item => item.id == this.patientForm.get('idHospital')?.value
      );

    if(hospitalSelected?.name !== this.hospitalName.value ||
      hospitalSelected?.city !== this.patientForm.get('hospitalCity')?.value){
        this.addHospital({id: 0,
          name: this.hospitalName.value,
          city: this.patientForm.get('hospitalCity')?.value
        })
      }else{
        this.idPatient? this.updatePatient() : this.addPatient()
      }
    }
  }

  addHospital(newHospital: Hospital){
    this.hospitalService.addHospital(newHospital).then(
      response => {
        this.patientForm.get('idHospital')?.setValue(response);
        this.idPatient? this.updatePatient() : this.addPatient()
      },
      error => {
        this.snackbar.open("Ocurrió un error al intentar crear un paciente.")
        console.error(error)
      }
    )
  }

  addPatient(){
    this.patientService.addPatient(this.patientForm).then(
      response => {
        this.snackbar.open("Paciente creado correctamente.", "Entendido")
        this.router.navigate(["/"]);
      },
      error => {
        this.snackbar.open("Ocurrió un error al intentar crear un paciente.")
        console.error(error)
      }
    )
  }

  updatePatient(){
    this.patientService.updatePatient(this.idPatient, this.patientForm).then(
      response => {
        this.snackbar.open("Paciente editado correctamente.", "Entendido")
        this.router.navigate(["/"]);
      },
      error => {
        this.snackbar.open("Ocurrió un error al intentar editar el paciente.")
        console.error(error)
      }
    )
  }

}
