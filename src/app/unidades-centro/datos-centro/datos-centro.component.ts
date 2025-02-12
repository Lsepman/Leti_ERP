import { DatosEditarUnidadCentro } from './../../shared/interfaces/datos-editar-centro-unidad';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { DatosEditarEntidad } from 'src/app/shared/interfaces/datos-editar-entidad';
import { UnidadesCentroService } from '../../services/unidades-centro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE } from 'src/app/shared/messages';

@Component({
  selector: 'app-datos-centro',
  templateUrl: './datos-centro.component.html',
  styleUrls: ['./datos-centro.component.scss']
})
export class DatosCentroComponent implements OnInit {

  @ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;
  rutaSeleccionada: string;
  lastRoute = '';
  unidadcentroForm: FormGroup;

  constructor(
            private router: Router,
            @Inject(MAT_DIALOG_DATA) public datosEditarUnidadCentro: DatosEditarUnidadCentro,
            private unidadesCentroService: UnidadesCentroService,
            private snackBar: MatSnackBar,
            public dialogRef: MatDialogRef<DatosCentroComponent>,
            ) { }

  ngOnInit(): void {
    this.rutaSeleccionada = this.router.url.substring(1);
    this.rutaSeleccionada = this.rutaSeleccionada.split('/')[0];
    this.router.navigate([`/${ this.rutaSeleccionada }`, { outlets: { sidebar: 'datos-basicos-centro'}}]);

    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet !== this.lastRoute) {
        this.lastRoute = this.rutaSeleccionada;
        this.outlet.deactivate();
      }
    });
    this.unidadesCentroService.setUnidadCentro(this.datosEditarUnidadCentro.unidadCentro);
  }

  navega(ruta: string) {
    this.router.navigate([`/${ this.rutaSeleccionada }`, { outlets: { sidebar: ruta } }]);
  }

  async save() {
      const RESPONSE = await this.unidadesCentroService.editUnidadCentro(this.unidadesCentroService.unidad).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, entidad: this.datosEditarUnidadCentro.unidadCentro});
        //this.entidadService.entidades = (await this.entidadService.getAllEntidades().toPromise()).data;
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    }

  onNoClick() {
    this.dialogRef.close({unidad: this.datosEditarUnidadCentro.unidadCentro});
  }
}

