import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteUnidadesCentroRoutingModule } from './delete-unidades-centro-routing.module';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro.component';


@NgModule({
  declarations: [DeleteUnidadesCentroComponent],
  imports: [
    CommonModule,
    DeleteUnidadesCentroRoutingModule
  ]
})
export class DeleteUnidadesCentroModule { }
