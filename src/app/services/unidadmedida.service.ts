import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnidadMedida, UnidadMedidaList } from '../models/unidadmedida';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {

  constructor(private http: HttpClient) { }

  List(page: number = 1, xpage: number = 100) {
    return this.http.get<UnidadMedidaList>(`/api/unidadmedida?page=${page}&xpage=${xpage}`);
  }

  guardar(unidadmedida: any) {
    return this.http.post<any>('/api/unidadmedida', unidadmedida, {
      observe: 'response'
    });
  }

  getById(id: number) {
    return this.http.get<any>('api/unidadmedida?page=1&xpage=10&idunidadmedida=' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/unidadmedida/' + id);
  }

}
