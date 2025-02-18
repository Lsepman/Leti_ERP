import { Injectable } from '@angular/core';
import { Alumno } from '../shared/interfaces/alumno';
import { CommonService } from '../shared/common.service';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../shared/interfaces/api-response';
import { URL_API } from 'src/environments/environment';

const ENDPOINT= 'alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  alumno: Alumno[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

    getAlumno(id_unidad_centro: number){
      const ROUTE = 'obtener_alumnos';
      return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id_unidad_centro}&route=${ROUTE}`, {headers: this.commonService.headers});
    }

   getAllAlumnos() {
      return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
    }

  addAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteAlumno(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
