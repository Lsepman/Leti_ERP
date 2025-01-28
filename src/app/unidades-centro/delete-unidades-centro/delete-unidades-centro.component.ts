import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { ENTIDAD_UNIDAD } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-unidades-centro',
  templateUrl: './delete-unidades-centro.component.html',
  styleUrls: ['./delete-unidades-centro.component.scss']
})
export class DeleteUnidadesCentroComponent implements OnInit {

  ENTIDAD: String;
  constructor(
    public dialogRef: MatDialogRef<DeleteUnidadesCentroComponent>,
    @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadesCentro,
    private servicioUnidadCentro: UnidadesCentroService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

  }

}
