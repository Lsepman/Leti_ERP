import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosCentroRoutingModule } from './datos-centro-routing.module';
import { DatosBasicosCentroComponent } from './datos-basicos-centro/datos-basicos-centro.component';
import { DatosCentroComponent } from './datos-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';

@NgModule({
  declarations: [DatosCentroComponent],
  imports: [
    CommonModule,
    DatosCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosCentroModule { }
