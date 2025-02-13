import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnoRoutingModule } from './alumno-routing.module';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AlumnoComponent } from './alumno.component';


@NgModule({
  declarations: [AlumnoComponent, EditAlumnoComponent, AddAlumnoComponent, DeleteAlumnoComponent],
  imports: [
    CommonModule,
    AlumnoRoutingModule,
    CrudMaterialModule
  ]
})
export class AlumnoModule { }
