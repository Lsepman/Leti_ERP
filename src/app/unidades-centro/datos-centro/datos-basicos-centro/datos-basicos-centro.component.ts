import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { DatosCentroComponent } from '../datos-centro.component';
import { UnidadesCentroService } from '../../../services/unidades-centro.service';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-datos-basicos-centro',
  templateUrl: './datos-basicos-centro.component.html',
  styleUrls: ['./datos-basicos-centro.component.scss']
})
export class DatosBasicosCentroComponent implements OnInit {

  datosBasicosCentroForm: FormGroup;
  unidades: UnidadesCentro[];
  alumnado: Alumno[];

  ENTIDAD: String;
  ciclos: Ciclo[];

  constructor(
    private datosUnidadCentro: DatosCentroComponent,
    private unidadesCentroService: UnidadesCentroService,
    private servicioCiclos: CiclosService
  ) {

    this.alumnado = this.datosUnidadCentro.datosEditarUnidadCentro.alumnado;
  }

  ngOnInit(): void {
    this.setForm();

    this.datosBasicosCentroForm.valueChanges.subscribe(form => {
      this.unidadesCentroService.setDatosBasicosUnidadCentro(form);
    });
  }

  setForm(): void {
    this.datosBasicosCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadesCentroService.unidad.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadesCentroService.unidad.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadesCentroService.unidad.id_ciclo, Validators.required),
      observaciones: new FormControl(this.unidadesCentroService.unidad.observaciones, Validators.required),
    });
    this.getCiclos();
  }
    async getCiclos(){
      const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
      if(RESPONSE.ok){
        this.ciclos= RESPONSE.data as Ciclo[];
      }
    }
}

