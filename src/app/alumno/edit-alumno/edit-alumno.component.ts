import { ENTIDAD_ALUMNO } from './../../shared/messages';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';
import { Alumno } from 'src/app/shared/interfaces/alumno';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.scss']
})
export class EditAlumnoComponent implements OnInit {

  alumnoForm: FormGroup;

  ENTIDAD : String;
  niveles:string[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  unidadesCentro: UnidadesCentro[];

  constructor(public dialogRef: MatDialogRef<EditAlumnoComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumno: AlumnoService,
    private servicioUnidadesCentro: UnidadesCentroService,
    @Inject(MAT_DIALOG_DATA) public alumno: Alumno
  ) { }

  ngOnInit(): void {
    const reg= '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[\\w .-]*/?';
    this.alumnoForm = new FormGroup({
      id_alumno: new FormControl(this.alumno.id_alumno),
      nombre: new FormControl(this.alumno.nombre, Validators.required),
      apellidos:new FormControl(this.alumno.apellidos, Validators.required),
      fecha_nacimiento:new FormControl(this.alumno.fecha_nacimiento, Validators.required),
      linkedin:new FormControl(this.alumno.linkedin, Validators.pattern(reg)),
      nivel_ingles:new FormControl(this.alumno.nivel_ingles, Validators.required),
      minusvalia:new FormControl(this.alumno.minusvalia, [Validators.required, Validators.min(0), Validators.max(100)]),
      otra_formacion:new FormControl(this.alumno.otra_formacion),
      id_unidad_centro:new FormControl(this.alumno.id_unidad_centro, Validators.required),
    });
    this.ENTIDAD = ENTIDAD_ALUMNO;
    this.getUnidadesCentro();
  }

  async confirmEdit() {
     if (this.alumnoForm.valid) {
       const alumnoForm = this.alumnoForm.value;

       const RESPONSE = await this.servicioAlumno.editAlumno(alumnoForm).toPromise();
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
