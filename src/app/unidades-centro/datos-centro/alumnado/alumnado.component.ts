import { SelectionModel } from '@angular/cdk/collections';
import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddAlumnoComponent } from 'src/app/alumno/add-alumno/add-alumno.component';
import { DeleteAlumnoComponent } from 'src/app/alumno/delete-alumno/delete-alumno.component';
import { EditAlumnoComponent } from 'src/app/alumno/edit-alumno/edit-alumno.component';
import { AlumnoService } from 'src/app/services/alumno.service';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { Permises } from 'src/app/shared/interfaces/api-response';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { AddAlumnoCentroComponent } from './add-alumno-centro/add-alumno-centro.component';

@Component({
  selector: 'app-alumnado',
  templateUrl: './alumnado.component.html',
  styleUrls: ['./alumnado.component.scss']
})
export class AlumnadoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

    dataSource: MatTableDataSource<Alumno> = new MatTableDataSource();

    idAlumnoFilter = new FormControl();
    nombreAlumnoFilter = new FormControl();
    apellidosAlumnoFilter = new FormControl();
    fechaNacimientoFilter = new FormControl();
    linkedinFilter = new FormControl();
    nivelInglesFilter = new FormControl();
    minusvaliaFilter = new FormControl();
    otraFormacionFilter = new FormControl();
    idUnidadCentroFilter= new FormControl();

    permises: Permises;

    selection: SelectionModel<Alumno>;
    alumno: Alumno;
    unidadCentro: UnidadesCentro;

    displayedColumns: string[];
      private filterValues = { id_alumno: '', nombre: '', apellidos: '', fecha_nacimiento: ''};

      constructor(
        public dialog: MatDialog,
            private alumnoService: AlumnoService,
            private overlay: Overlay,
            private unidadesCentroService: UnidadesCentroService

      ) { }

  ngOnInit(): void {
    this.unidadCentro = this.unidadesCentroService.unidad;
    this.getAlumnos(this.unidadCentro);

  }

  async getAlumnos(unidadCentro: UnidadesCentro){
    const RESPONSE = await this.alumnoService.getAlumnos(unidadCentro.id_unidad_centro).toPromise();
    this.permises = RESPONSE.permises;

    if(RESPONSE.ok){
      this.alumnoService.alumno = RESPONSE.data as Alumno[];
      this.displayedColumns =['id_alumno', 'nombre', 'apellidos', 'fecha_nacimiento', 'actions'];
      this.dataSource.data = this.alumnoService.alumno;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }

  }
  async addAlumno(id_unidad_centro: number) {
      const dialogRef = this.dialog.open(AddAlumnoCentroComponent, { data: id_unidad_centro, scrollStrategy: this.overlay.scrollStrategies.noop() });
      const RESULT = await dialogRef.afterClosed().toPromise();
      if (RESULT) {
        if (RESULT.ok) {
          this.ngOnInit();
        }
      }
    }

    async editAlumno(alumno: Alumno) {
      const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
      const RESULT = await dialogRef.afterClosed().toPromise();
      if (RESULT) {
        if (RESULT.ok) {
          this.ngOnInit();
        }
      }
    }

    async deleteAlumno(alumno: Alumno) {
      const dialogRef = this.dialog.open(DeleteAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
      const RESULT = await dialogRef.afterClosed().toPromise();
      if (RESULT) {
        if (RESULT.ok) {
          this.ngOnInit();
        }
      }
    }


    createFilter(): (alumno: Alumno, filter: string) => boolean {
      const filterFunction = (alumno: Alumno, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);

        return alumno.id_alumno.toString().indexOf(searchTerms.id_alumno) !== -1
          && alumno.nombre.toLowerCase().indexOf(searchTerms.nombre.toLowerCase()) !== -1
          && alumno.apellidos.toLowerCase().indexOf(searchTerms.apellidos.toLowerCase()) !== -1
          && alumno.fecha_nacimiento.toString().indexOf(searchTerms.fecha_nacimiento.toLowerCase()) !== -1;
      };

      return filterFunction;
    }

    onChanges() {
       this.idAlumnoFilter.valueChanges.subscribe(value => {
          this.filterValues.id_alumno = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.nombreAlumnoFilter.valueChanges
      .subscribe(value => {
          this.filterValues.nombre = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.apellidosAlumnoFilter.valueChanges
      .subscribe(value => {
          this.filterValues.apellidos = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.fechaNacimientoFilter.valueChanges
      .subscribe(value => {
          this.filterValues.fecha_nacimiento = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    }

  }
