import { Component, OnInit } from '@angular/core';
import { Patient } from '../core/classes/patient';
import { registerLocaleData} from '@angular/common'
import { PatientService } from '../core/services/patient.service';
import localeEsMx from '@angular/common/locales/es-MX';
import { DialogConfirmDeleteComponent } from '../dialog-confirm-delete/dialog-confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.css'],
  providers: [PatientService]
})

export class ListPatientComponent implements OnInit{

  patients: Array<Patient> = [];

  displayedColumns: string[] = ['names', 'last_name', 'second_last_name', 'sex',  'birthday', 'age',
  'inscription_date', 'hospital_name', 'hospital_city', 'guardian_name', 'guardian_phone', 'accions'];

  headers: string[]= ['Nombres', 'Apellidos','Sexo ', 'Nacimiento',
  'Edad', 'Inscripción', 'Hospital de origen', 'Ciudad', 'Tutor', 'Contacto'];

  isGridView= true;
  datePipe: DatePipe = new DatePipe('en-US');

  constructor( private patientService: PatientService,
    private dialog: MatDialog, private snackbar: MatSnackBar){}

  ngOnInit(){
    registerLocaleData(localeEsMx);
    this.getPatients();
  }

  getPatients(){
    this.patientService.getPatients().then(
      response => {
        this.patients =response;
      },error => {
        console.error(error);
      }
    )
  }

  gridView(isGrid: boolean){
    this.isGridView = isGrid;
  }

  openConfirmDialog(idPatient: number) {

    const dialogRef = this.dialog.open(DialogConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(accion => {
      if(accion){
        this.patientService.deletePatient(idPatient).then(
          () =>{
            this.snackbar.open("Paciente eliminado correctamente.", "Entendido")
            this.getPatients()
          },
          error => console.error(error)
        )
      }
    });
  }

  exportToPDF(){
    let data: {[key: string]: string;}[] = [];
    this.patients.forEach(patient =>{
      data.push({
        "Nombres" : patient.names,
        "Apellidos" : patient.last_name+ " " +patient.second_last_name,
        "Sexo " : patient.sex,
        "Nacimiento" : String(this.datePipe.transform(patient.birthday,"dd/MM/yyyy")),
        "Edad" : patient.age.toString(),
        "Inscripción" :  String(this.datePipe.transform(patient.inscription_date,"dd/MM/yyyy")),
        "Hospital de origen" : patient.hospital_name,
        "Ciudad" : patient.hospital_city,
        "Tutor" : patient.guardian_name,
        "Contacto" : patient.guardian_phone,
      })
    })
    const doc = new jsPDF({orientation:"landscape"});
    doc.table(1, 1, data, this.headers, { autoSize: true })
    doc.save("pacientes-lista.pdf");
  }

}
