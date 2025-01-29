import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUnidadesCentroRoutingModule } from './add-unidades-centro-routing.module';
import { AddUnidadesCentroComponent } from './add-unidades-centro.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [AddUnidadesCentroComponent],
  imports: [
    CommonModule,
    AddUnidadesCentroRoutingModule,
    CrudMaterialModule

  ]
})
export class AddUnidadesCentroModule { }
