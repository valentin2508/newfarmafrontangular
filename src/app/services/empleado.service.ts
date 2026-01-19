import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado, EmpleadoList } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient) { }

  listar(page: number, xpage: number) {
    return this.http.get<EmpleadoList>(`/api/empleado?page=${page}&xpage=${xpage}`);
  }

  guardar(empleado: any) {
    return this.http.post<any>('/api/empleado', empleado, {
      observe: 'response'
    });
  }

  getById(id: number) {
    return this.http.get<any>('api/empleado?page=1&xpage=100&idempleado=' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/empleado/' + id);
  }

  updateEmpleado(id: number, empleado: Empleado) {
    return this.http.put<Empleado>(`/api/empleado/${id}`, empleado);
  }
}