import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosBasicosCentroRoutingModule } from './datos-basicos-centro-routing.module';
import { DatosBasicosCentroComponent } from './datos-basicos-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [DatosBasicosCentroComponent],
  imports: [
    CommonModule,
    DatosBasicosCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosBasicosCentroModule { }
