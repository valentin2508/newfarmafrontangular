import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cargo, CargoList } from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  List(page: number = 1, xpage: number = 100) {
    return this.http.get<CargoList>(`/api/cargo?page=${page}&xpage=${xpage}`);
  }

  guardar(cargo: any) {
    return this.http.post<any>('/api/cargo', cargo, {
      observe: 'response'
    });
  }

  getById(id: number) {
    debugger;
    return this.http.get<any>('api/cargo?page=1&xpage=10&idcargo=' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/cargo/' + id);
  }

}