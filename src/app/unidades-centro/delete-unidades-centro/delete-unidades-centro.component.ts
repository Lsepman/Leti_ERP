import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE, ENTIDAD_CICLO, ENTIDAD_UNIDAD } from 'src/app/shared/messages';

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
    this.ENTIDAD = ENTIDAD_UNIDAD;
  }
  onNoClick(): void{
    this.dialogRef.close({ok: false});
  }
  async confirmDelete(){
    const RESPONSE = await this.servicioUnidadCentro.deleteUnidadCentro(this.unidadCentro.id_unidad_centro).toPromise();
    if(RESPONSE.ok){
      this.snackBar.open(RESPONSE.message, CLOSE,{duration:5000});
      this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
    }else{
      this.snackBar.open(RESPONSE.message, CLOSE, {duration: 5000});
    }
  }

}
