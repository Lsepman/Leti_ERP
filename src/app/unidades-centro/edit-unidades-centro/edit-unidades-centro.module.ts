import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUnidadesCentroRoutingModule } from './edit-unidades-centro-routing.module';
import { EditUnidadesCentroComponent } from './edit-unidades-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [EditUnidadesCentroComponent],
  imports: [
    CommonModule,
    EditUnidadesCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class EditUnidadesCentroModule { }
