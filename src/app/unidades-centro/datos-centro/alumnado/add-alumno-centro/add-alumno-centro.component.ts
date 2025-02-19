import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddAlumnoComponent } from 'src/app/alumno/add-alumno/add-alumno.component';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { UnidadesCentroService } from '../../../../services/unidades-centro.service';
import { CLOSE, ENTIDAD_ALUMNO, INVALID_FORM } from 'src/app/shared/messages';
import { Alumno } from 'src/app/shared/interfaces/alumno';

@Component({
  selector: 'app-add-alumno-centro',
  templateUrl: './add-alumno-centro.component.html',
  styleUrls: ['./add-alumno-centro.component.scss']
})
export class AddAlumnoCentroComponent implements OnInit {

  alumnoForm: FormGroup;
  niveles:string[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  unidadesCentro: UnidadesCentro[];

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<AddAlumnoCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumnos: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public id_unidad_centro: number,
  ) { }

  ngOnInit(): void {
     const reg= '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[\\w .-]*/?';
        this.alumnoForm = new FormGroup({
          id_alumno: new FormControl('', Validators.required),
          nombre: new FormControl('', Validators.required),
          apellidos:new FormControl('', Validators.required),
          fecha_nacimiento:new FormControl('', Validators.required),
          linkedin:new FormControl('',Validators.pattern(reg)),
          nivel_ingles:new FormControl('', Validators.required),
          minusvalia:new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
          otra_formacion:new FormControl(''),
          id_unidad_centro:new FormControl(this.id_unidad_centro, Validators.required),
        });
        this.ENTIDAD = ENTIDAD_ALUMNO;

  }
  async confirmAdd() {
       if (this.alumnoForm.valid) {
         const alumno = this.alumnoForm.value as Alumno;

         const RESPONSE = await this.servicioAlumnos.addAlumno(alumno).toPromise();
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


     onNoClick() {
       this.dialogRef.close({ok: false});
     }

}
