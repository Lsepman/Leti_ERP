import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Alumno } from '../shared/interfaces/alumno';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Permises } from '../shared/interfaces/api-response';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { AlumnoService } from '../services/alumno.service';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {

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

  displayedColumns: string[];
  private filterValues = { id_alumno: '', nombre: '', apellidos: '', fecha_nacimiento: '', linkedin: '', nivel_ingles: '', minusvalia: '' , otra_formacion: '', id_unidad_centro: ''};

  constructor(
    public dialog: MatDialog,
        private alumnoService: AlumnoService,
        private overlay: Overlay

  ) { }

  ngOnInit(): void {
    this.getAlumnos();
  }
async getAlumnos() {
    const RESPONSE = await this.alumnoService.getAllAlumnos().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.alumnoService.alumno = RESPONSE.data as Alumno[];
      this.displayedColumns = ['nombre', 'apellidos', 'fecha_nacimiento', 'linkedin','nivel_ingles', 'minusvalia', 'otra_formacion', 'id_unidad_centro', 'actions'];
      this.dataSource.data = this.alumnoService.alumno;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<Alumno>(false, [this.alumno]);

      this.onChanges();
    }
  }

  async addAlumno() {
    const dialogRef = this.dialog.open(AddAlumnoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.contacto.push(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
        this.ngOnInit();
      }
    }
  }

  async editAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.editContacto(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
        this.ngOnInit();
      }
    }
  }

  async deleteAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(DeleteAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.contactosService.deleteContacto(RESULT.data);
        //this.dataSource.data = this.contactosService.contacto;
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
        && alumno.fecha_nacimiento.toString().indexOf(searchTerms.fecha_nacimiento) !== -1
        && alumno.linkedin.toString().indexOf(searchTerms.linkedin.toLowerCase()) !== -1
        && alumno.nivel_ingles.toLowerCase().indexOf(searchTerms.nivel_ingles.toLowerCase()) !== -1
        && alumno.minusvalia.toString().indexOf(searchTerms.minusvalia) !== -1
        && alumno.otra_formacion.toLowerCase().indexOf(searchTerms.otra_formacion.toLowerCase()) !== -1
        && alumno.id_unidad_centro.toString().indexOf(searchTerms.id_unidad_centro) !== -1;
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

    this.linkedinFilter.valueChanges
    .subscribe(value => {
        this.filterValues.linkedin = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.nivelInglesFilter.valueChanges
    .subscribe(value => {
        this.filterValues.nivel_ingles = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.minusvaliaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.minusvalia = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.otraFormacionFilter.valueChanges
    .subscribe(value => {
        this.filterValues.otra_formacion = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.idUnidadCentroFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_unidad_centro = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }



}
