import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empresa, EmpresaList } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  List(page: number = 1, xpage: number = 100) {
    return this.http.get<EmpresaList>(`/api/empresa?page=${page}&xpage=${xpage}`);
  }

  guardar(empresa: any) {
    return this.http.post<any>('/api/empresa', empresa, {
      observe: 'response'
    });
  }

  getById(id: number) {
    return this.http.get<any>('api/empresa?page=1&xpage=10&idempresa=' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/empresa/' + id);
  }

}