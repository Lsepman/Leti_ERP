import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesDualService } from 'src/app/services/unidades-dual.service';
import { UnidadDual } from 'src/app/shared/interfaces/unidad-dual';
import { CLOSE, ENTIDAD_UNIDAD, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-add-unidad-dual',
  templateUrl: './add-unidad-dual.component.html',
  styleUrls: ['./add-unidad-dual.component.scss']
})
export class AddUnidadDualComponent implements OnInit {

  unidadDualForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<AddUnidadDualComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidades: UnidadesDualService
    ) { }

  ngOnInit(): void {
    this.unidadDualForm = new FormGroup({
      unidadDual: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_UNIDAD;
  }

  async confirmAdd() {
    if (this.unidadDualForm.valid){
      const unidadDual = this.unidadDualForm.value as UnidadDual;

      const RESPONSE = await this.servicioUnidades.addUnidadDual(unidadDual).toPromise();
      if(RESPONSE.ok){
        this.snackBar.open(RESPONSE.message, CLOSE, {duration: 5000});
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      }else{
        this.snackBar.open(RESPONSE.message, CLOSE, {duration: 5000});
      }
    }else{
      this.snackBar.open(INVALID_FORM, CLOSE, {duration: 5000});
    }
  }
  onNoClick(){
    this.dialogRef.close({ok: false});
  }
}
