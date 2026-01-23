import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presentacion, PresentacionList } from '../models/presentacion';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  constructor(private http: HttpClient) { }

  List(page: number = 1, xpage: number = 100) {
    return this.http.get<PresentacionList>(`/api/presentacion?page=${page}&xpage=${xpage}`);
  }

  guardar(presentacion: any) {
    return this.http.post<any>('/api/presentacion', presentacion, {
      observe: 'response'
    });
  }

  getById(id: number) {
    return this.http.get<any>('api/presentacion?page=1&xpage=10&idpresentacion=' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/presentacion/' + id);
  }

}
