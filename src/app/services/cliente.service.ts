import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente, ClienteList } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  listar(page: number, xpage: number) {
    return this.http.get<ClienteList>(`/api/cliente?page=${page}&xpage=${xpage}`);
  }
  
 listarByIdPersona(personaId:number) {
    return this.http.get<ClienteList>(`/api/cliente?page=1&xpage=100&persona_idpersona=${personaId}`);
  }
  guardar(Cliente: any) {
    debugger;
    return this.http.post<any>('/api/cliente', Cliente, {

      observe: 'response'
    });
  }

  getById(id: number) {
    return this.http.get<any>('api/cliente?page=1&xpage=100&idcliente=' + id);
  }

  eliminar(id: number) {
    return this.http.delete('/api/cliente/' + id);
  }

  updateCliente(id: number, cliente: Cliente) {
    return this.http.put<Cliente>(`/api/cliente/${id}`, cliente);
  }
}