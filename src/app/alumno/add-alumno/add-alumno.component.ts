import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE, ENTIDAD_ALUMNO, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {

  alumnoForm: FormGroup;

  ENTIDAD : String;
  niveles:string[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  unidadesCentro: UnidadesCentro[];

  constructor(public dialogRef: MatDialogRef<AddAlumnoComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumno: AlumnoService,
    private servicioUnidadesCentro: UnidadesCentroService,
  ) { }

  ngOnInit(): void {
    this.alumnoForm = new FormGroup({
      id_alumno: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellidos:new FormControl('', Validators.required),
      fecha_nacimiento:new FormControl('', Validators.required),
      linkedin:new FormControl(null),
      nivel_ingles:new FormControl(null, Validators.required),
      minusvalia:new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      otra_formacion:new FormControl(null),
      id_unidad_centro:new FormControl(0, Validators.required),
    });
    this.ENTIDAD = ENTIDAD_ALUMNO;
    this.getUnidadesCentro();
  }

  async confirmAdd() {
     if (this.alumnoForm.valid) {
       const alumno = this.alumnoForm.value as Alumno;

       const RESPONSE = await this.servicioAlumno.addAlumno(alumno).toPromise();
       if (RESPONSE.ok) {
         this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
         this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
       } else {
         this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
       }
     } else {
       this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
     }
   }

     async getUnidadesCentro(){
       const RESPONSE = await this.servicioUnidadesCentro.get().toPromise();
       if(RESPONSE.ok){
         this.unidadesCentro= RESPONSE.data as UnidadesCentro[];
       }
     }

   onNoClick() {
     this.dialogRef.close({ok: false});
   }

}
