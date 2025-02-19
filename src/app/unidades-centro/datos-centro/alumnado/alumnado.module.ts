import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnadoRoutingModule } from './alumnado-routing.module';
import { AlumnadoComponent } from './alumnado.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { AddAlumnoCentroComponent } from './add-alumno-centro/add-alumno-centro.component';
import { EditAlumnoCentroComponent } from './edit-alumno-centro/edit-alumno-centro.component';
import { DeleteAlumnoCentroComponent } from './delete-alumno-centro/delete-alumno-centro.component';


@NgModule({
  declarations: [AlumnadoComponent, AddAlumnoCentroComponent, EditAlumnoCentroComponent, DeleteAlumnoCentroComponent],
  imports: [
    CommonModule,
    AlumnadoRoutingModule,
    CrudMaterialModule
  ]
})
export class AlumnadoModule { }
