import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuario, EmpleadoList } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listar(page: number, xpage: number) {
    return this.http.get<EmpleadoList>(`/api/usuario?page=${page}&xpage=${xpage}`);
  }

  guardar(usuario: any) {
    return this.http.post<any>('/api/auth/register', usuario, {
      observe: 'response'
    });
  }

  getById(id: number) {
    return this.http.get<any>('api/usuario/' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/usuario/' + id);
  }

  
}