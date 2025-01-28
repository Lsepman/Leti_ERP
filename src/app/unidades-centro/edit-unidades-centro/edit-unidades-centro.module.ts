import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUnidadesCentroRoutingModule } from './edit-unidades-centro-routing.module';
import { EditUnidadesCentroComponent } from './edit-unidades-centro.component';


@NgModule({
  declarations: [EditUnidadesCentroComponent],
  imports: [
    CommonModule,
    EditUnidadesCentroRoutingModule
  ]
})
export class EditUnidadesCentroModule { }
