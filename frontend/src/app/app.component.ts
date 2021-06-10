import { Component, OnInit } from '@angular/core';
import { Patient } from './core/classes/patient';
import { registerLocaleData} from '@angular/common'
import { PatientService } from './core/services/patient.service';
import localeEsMx from '@angular/common/locales/es-MX';
import { DialogConfirmDeleteComponent } from './dialog-confirm-delete/dialog-confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PatientService]
})

export class AppComponent implements OnInit{

  patients: Array<Patient> = [];
  displayedColumns: string[] = ['names', 'last_name', 'second_last_name', 'sex',  'birthday', 'age',
  'inscription_date', 'hospital_name', 'hospital_city', 'guardian_name', 'guardian_phone', 'accions'];
  isGridView= true;

  constructor( private patientService: PatientService,
    private dialog: MatDialog, private snackbar: MatSnackBar){}

  ngOnInit(){
    registerLocaleData(localeEsMx);

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
            this.snackbar.open("Paciente eliminado correctamente.")
          },
          error => console.error(error)
        )
      }
    });
  }

}
