import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Laboratorio, LaboratorioList } from '../models/laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  constructor(private http: HttpClient) { }

  List(page: number = 1, xpage: number = 100) {
    return this.http.get<LaboratorioList>(`/api/laboratorio?page=${page}&xpage=${xpage}`);
  }

  guardar(laboratorio: any) {
    return this.http.post<any>('/api/laboratorio', laboratorio, {
      observe: 'response'
    });
  }

  getById(id: number) {
    debugger;
    return this.http.get<any>('api/laboratorio?page=1&xpage=10&idlaboratorio=' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/laboratorio/' + id);
  }

}
