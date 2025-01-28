import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { UnidadesCentro } from '../shared/interfaces/unidades-centro';
import { ApiResponse } from '../shared/interfaces/api-response';
import { URL_API } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UnidadesCentroService {

  entidades: UnidadesCentro[];
  entidad: UnidadesCentro;

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


}
