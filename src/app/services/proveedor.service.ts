import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor, ProveedorList } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }

  listar(page: number, xpage: number) {
    return this.http.get<ProveedorList>(`/api/proveedor?page=${page}&xpage=${xpage}`);
  }
  
  listarByIdPersona(personaId:number) {
    return this.http.get<ProveedorList>(`/api/proveedor?page=1&xpage=100&persona_idpersona=${personaId}`);
  }

  guardar(proveedor: any) {
    return this.http.post<any>('/api/proveedor', proveedor, {
      observe: 'response'
    });
  }

  getById(id: number) {
    return this.http.get<any>('api/proveedor?page=1&xpage=100&idproveedor=' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/proveedor/' + id);
  }

  update(id: number, proveedor: Proveedor) {
    return this.http.put<Proveedor>(`/api/proveedor/${id}`, proveedor);
  }
}
