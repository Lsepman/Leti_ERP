import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE, ENTIDAD_UNIDAD, ERROR } from 'src/app/shared/messages';


@Component({
  selector: 'app-edit-unidades-centro',
  templateUrl: './edit-unidades-centro.component.html',
  styleUrls: ['./edit-unidades-centro.component.scss']
})
export class EditUnidadesCentroComponent implements OnInit {

  unidadCentroForm: FormGroup;
  ciclos: Ciclo[];
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidadesCentro: UnidadesCentroService,
    @Inject(MAT_DIALOG_DATA) public unidadCentro: UnidadesCentro,
    private servicioCiclos: CiclosService
    ) { }

  ngOnInit(): void {
   this.setForm();

  }
  setForm(){
    this.ENTIDAD = ENTIDAD_UNIDAD;
    this.unidadCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadCentro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadCentro.id_ciclo, Validators.required),
      observaciones: new FormControl(null)
    });
    this.getCiclos();
  }

  async confirmEdit(){
    console.log(this.unidadCentro);
    if(this.unidadCentroForm.valid){
      const unidadCentroForm= this.unidadCentroForm.value;
      const RESPONSE = await this.servicioUnidadesCentro.editUnidadCentro(unidadCentroForm).toPromise();
      if(RESPONSE.ok){
        this.snackBar.open(RESPONSE.message, CLOSE, {duration: 5000});
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      }else{
        console.log("Llega aqui")
        this.snackBar.open(RESPONSE.message, CLOSE, {duration:5000});
      }
    }else{
      this.snackBar.open(ERROR,CLOSE,{duration: 5000});
    }
  }
  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if(RESPONSE.ok){
      this.ciclos= RESPONSE.data as Ciclo[];
    }
  }

  onNoClick(){
    this.dialogRef.close({ok: false});
  }



  }


