import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUnidadesCentroComponent } from './edit-unidades-centro.component';

const routes: Routes = [{ path: '', component: EditUnidadesCentroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUnidadesCentroRoutingModule { }
