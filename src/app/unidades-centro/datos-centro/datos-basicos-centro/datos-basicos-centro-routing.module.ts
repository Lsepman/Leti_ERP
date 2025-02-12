import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosBasicosCentroComponent } from './datos-basicos-centro.component';

const routes: Routes = [{path: '', component: DatosBasicosCentroComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosBasicosCentroRoutingModule { }
