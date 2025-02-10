import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosCentroComponent } from './datos-centro.component';

const routes: Routes = [
  {
    path:'',
    component: DatosCentroComponent,
    redirectTo: 'datos-centro'
  },
  {
    path:'datos-basicos-centro',
    loadChildren:() => import('./datos-basicos-centro/datos-basicos-centro.module').then(m=> m.DatosBasicosCentroModule),
    outlet: 'sidebar'
  },
  {
    path:'alumnado-centro',
    loadChildren:() => import('./alumnado/alumnado.module').then(m => m.AlumnadoModule),
    outlet: 'sidebar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosCentroRoutingModule { }
