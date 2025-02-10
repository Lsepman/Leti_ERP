import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesCentroRoutingModule } from './unidades-centro-routing.module';
import { UnidadesCentroComponent } from './unidades-centro.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AlumnadoComponent } from './datos-centro/alumnado/alumnado.component';
import { DatosCentroComponent } from './datos-centro/datos-centro.component';


@NgModule({
  declarations: [UnidadesCentroComponent,DatosCentroComponent, AlumnadoComponent],
  imports: [
    CommonModule,
    UnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class UnidadesCentroModule { }
