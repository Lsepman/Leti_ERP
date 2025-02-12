import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesCentroRoutingModule } from './unidades-centro-routing.module';
import { UnidadesCentroComponent } from './unidades-centro.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';

import { DatosCentroModule } from './datos-centro/datos-centro.module';
import { EditUnidadesCentroComponent } from './edit-unidades-centro/edit-unidades-centro.component';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro/delete-unidades-centro.component';
import { AddUnidadesCentroComponent } from './add-unidades-centro/add-unidades-centro.component';


@NgModule({
  declarations: [UnidadesCentroComponent,EditUnidadesCentroComponent, AddUnidadesCentroComponent, DeleteUnidadesCentroComponent],
  imports: [
    CommonModule,
    UnidadesCentroRoutingModule,
    CrudMaterialModule,
    DatosCentroModule
  ]
})
export class UnidadesCentroModule { }
