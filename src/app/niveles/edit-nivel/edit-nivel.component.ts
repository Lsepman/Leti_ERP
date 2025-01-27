import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NivelesService } from 'src/app/services/niveles.service';
import { Nivel } from 'src/app/shared/interfaces/nivel';

@Component({
  selector: 'app-edit-nivel',
  templateUrl: './edit-nivel.component.html',
  styleUrls: ['./edit-nivel.component.scss']
})
export class EditNivelComponent implements OnInit {

  nivelesForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditNivelComponent>,
    private snackBar: MatSnackBar,
    private servicioNiveles: NivelesService,
    @Inject(MAT_DIALOG_DATA) public nivel: Nivel
  ) { }

  ngOnInit(): void {
  }

}
