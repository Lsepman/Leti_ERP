import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosCentroRoutingModule } from './datos-centro-routing.module';
import { DatosBasicosCentroComponent } from './datos-basicos-centro/datos-basicos-centro.component';
import { AlumnadoComponent } from './alumnado/alumnado.component';
import { AlumnadoModule } from './alumnado/alumnado.module';


@NgModule({
  declarations: [DatosBasicosCentroComponent],
  imports: [
    CommonModule,
    DatosCentroRoutingModule,
  ]
})
export class DatosCentroModule { }
