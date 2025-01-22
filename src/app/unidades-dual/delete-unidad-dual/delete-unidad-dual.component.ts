import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesDualService } from 'src/app/services/unidades-dual.service';
import { UnidadDual } from 'src/app/shared/interfaces/unidad-dual';
import { CLOSE, ENTIDAD_UNIDAD } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-unidad-dual',
  templateUrl: './delete-unidad-dual.component.html',
  styleUrls: ['./delete-unidad-dual.component.scss']
})
export class DeleteUnidadDualComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteUnidadDualComponent>,
    @Inject(MAT_DIALOG_DATA) public unidadDual: UnidadDual,
    public servicioUnidades: UnidadesDualService,
    public snackBar: MatSnackBar,
  )
  { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_UNIDAD;
  }

  onNoClick(): void{
    this.dialogRef.close({ok: false});
  }

  async confirmDelete(){
    const RESPONSE = await this.servicioUnidades.deleteUnidadDual(this.unidadDual.id_unidad_dual).toPromise();
    if(RESPONSE.ok){
      this.snackBar.open(RESPONSE.message, CLOSE, {duration: 5000});
      this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
    }else{this.snackBar.open(RESPONSE.message, CLOSE, {duration: 5000});}
  }

}
