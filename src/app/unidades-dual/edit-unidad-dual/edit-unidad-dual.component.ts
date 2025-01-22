import { Component, Inject, OnInit } from '@angular/core';
import { UnidadDual } from '../../shared/interfaces/unidad-dual';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesDualService } from 'src/app/services/unidades-dual.service';
import { CLOSE, ENTIDAD_UNIDAD, ERROR } from 'src/app/shared/messages';

@Component({
  selector: 'app-edit-unidad-dual',
  templateUrl: './edit-unidad-dual.component.html',
  styleUrls: ['./edit-unidad-dual.component.scss']
})
export class EditUnidadDualComponent implements OnInit {

  unidadDualForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditUnidadDualComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidades: UnidadesDualService,
    @Inject(MAT_DIALOG_DATA) public unidadDual: UnidadDual
    ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_UNIDAD;
    this.unidadDualForm = new FormGroup({
      id_unidad_dual: new FormControl(this.unidadDual.id_unidad_dual, Validators.required),
      unidad_dual: new FormControl(this.unidadDual.unidad_dual, Validators.required),
      observaciones: new FormControl(this.unidadDual.observaciones)
    });
  }

  async confirmEdit(){
    if(this.unidadDualForm.valid){
      const unidadDualForm = this.unidadDualForm.value;

      const RESPONSE = await this.servicioUnidades.editUnidadDual(unidadDualForm).toPromise();
      if(RESPONSE.ok){
        this.snackBar.open(RESPONSE.message, CLOSE, {duration: 5000});
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      }else{this.snackBar.open(ERROR, CLOSE, {duration: 5000}); }
      }else{this.snackBar.open(ERROR, CLOSE,{duration: 5000});}
    }

    onNoClick(){
      this.dialogRef.close({ok: false});
    }

  }

