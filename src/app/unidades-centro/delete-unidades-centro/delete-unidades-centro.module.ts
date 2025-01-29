import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteUnidadesCentroRoutingModule } from './delete-unidades-centro-routing.module';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [DeleteUnidadesCentroComponent],
  imports: [
    CommonModule,
    DeleteUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DeleteUnidadesCentroModule { }
