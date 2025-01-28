import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUnidadesCentroRoutingModule } from './add-unidades-centro-routing.module';
import { AddUnidadesCentroComponent } from './add-unidades-centro.component';


@NgModule({
  declarations: [AddUnidadesCentroComponent],
  imports: [
    CommonModule,
    AddUnidadesCentroRoutingModule
  ]
})
export class AddUnidadesCentroModule { }
