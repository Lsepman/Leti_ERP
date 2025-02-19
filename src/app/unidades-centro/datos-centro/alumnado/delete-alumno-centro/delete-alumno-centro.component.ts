import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { CLOSE, ENTIDAD_ALUMNO } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-alumno-centro',
  templateUrl: './delete-alumno-centro.component.html',
  styleUrls: ['./delete-alumno-centro.component.scss']
})
export class DeleteAlumnoCentroComponent implements OnInit {
 ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteAlumnoCentroComponent>,
    @Inject(MAT_DIALOG_DATA) public alumno: Alumno,
    public servicioAlumno: AlumnoService,
    public snackBar: MatSnackBar,
  )
  {   }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_ALUMNO;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioAlumno.deleteAlumno(this.alumno.id_alumno).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
