import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cliente, ClienteList } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<ClienteList>('http://localhost:8000/api/cliente?page=1&xpage=10');
  }
  //http://localhost:8000/api/cliente?page=1&xpage=100&persona_idpersona=7
listarByIdPersona(personaId:number) {
    return this.http.get<ClienteList>(`http://localhost:8000/api/cliente?page=1&xpage=100&persona_idpersona=${personaId}`);
  }
  guardar(Cliente: any) {
    debugger;
    return this.http.post<any>('http://localhost:8000/api/cliente', Cliente, {
      
      observe: 'response'
    });
  }

  eliminar(id: number) {
    return this.http.delete('http://localhost:8000/api/cliente/' + id);
  }
}