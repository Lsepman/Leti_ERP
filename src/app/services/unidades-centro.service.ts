import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { UnidadesCentro } from '../shared/interfaces/unidades-centro';
import { ApiResponse } from '../shared/interfaces/api-response';
import { URL_API } from 'src/environments/environment';

const ENDPOINT= 'unidad_centro';

@Injectable({
  providedIn: 'root'
})
export class UnidadesCentroService {

  entidades: UnidadesCentro[];
  entidad: UnidadesCentro;
  commonService: any;
  unidadCentro: UnidadesCentro[];

  constructor(private http: HttpClient, private CommonService: CommonService) { }

  setEntidad(entidad: UnidadesCentro){
    this.entidad= entidad;
  }

  setDatosBasicosEntidad(formEntidad: any){
    this.entidad.id_unidad_centro=formEntidad.id_unidad_centro;
    this.entidad.unidad_centro= formEntidad.unidad_centro;
    this.entidad.id_ciclo= formEntidad.id_ciclo;
    this.entidad.observaciones= formEntidad.observaciones;
  }
  get(){
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, {headers: this.CommonService.headers});
  }
   getAllUnidadesCentro() {
      return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
    }

    addUnidadCentro(unidadCentro: UnidadesCentro) {
      const body = JSON.stringify(unidadCentro);
      return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
    }

    editUnidadCentro(unidadCentro: UnidadesCentro) {
      const body = JSON.stringify(unidadCentro);
      return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
    }

    deleteUnidadCentro(id: number|string) {
      return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
    }


}
