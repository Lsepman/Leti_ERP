import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlumnadoRoutingModule } from './alumnado-routing.module';
import { AlumnadoComponent } from './alumnado.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [AlumnadoComponent],
  imports: [
    CommonModule,
    AlumnadoRoutingModule,
    CrudMaterialModule
  ]
})
export class AlumnadoModule { }
