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

  unidadCentro: UnidadesCentro[];
  unidad: UnidadesCentro;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setUnidadCentro(unidadCentro : UnidadesCentro) {
      this.unidad = unidadCentro;
    }

    setDatosBasicosUnidadCentro(formUnidadCentro: any) {
      this.unidad.id_unidad_centro = formUnidadCentro.id_unidad_centro;
      this.unidad.unidad_centro= formUnidadCentro.unidad_centro;
      this.unidad.id_ciclo= formUnidadCentro.id_ciclo;
      this.unidad.observaciones= formUnidadCentro.observaciones;
    }

  get(){
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, {headers: this.commonService.headers});
  }

  getUnidadesCentro(idEntidad: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?entidad=${idEntidad}`, { headers: this.commonService.headers });
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
