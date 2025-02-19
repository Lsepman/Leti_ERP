import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE, ENTIDAD_ALUMNO, ERROR } from 'src/app/shared/messages';

@Component({
  selector: 'app-edit-alumno-centro',
  templateUrl: './edit-alumno-centro.component.html',
  styleUrls: ['./edit-alumno-centro.component.scss']
})
export class EditAlumnoCentroComponent implements OnInit {

  alumnoForm: FormGroup;
  unidadesCentro: UnidadesCentro[];
  niveles:string[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioAlumnos: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public alumno: Alumno,
    private servicioUnidadesCentro: UnidadesCentroService

  ) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.ENTIDAD = ENTIDAD_ALUMNO;
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
  }

    async confirmEdit(){
      console.log(this.alumno);
      if (this.alumnoForm.valid) {
        const alumnoForm = this.alumnoForm.value;

        const RESPONSE = await this.servicioAlumnos.editAlumno(alumnoForm).toPromise();
        if (RESPONSE.ok) {
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
        } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    }

    onNoClick() {
      this.dialogRef.close({ ok: false });
    }

}
