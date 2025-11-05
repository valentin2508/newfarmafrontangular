import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonaList } from '../models/persona';
@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(
    private http:HttpClient
  ) { }
  url="localhost:8000/api/persona?page=1&xpage=10";
  List(){
    return this.http.get<PersonaList>(this.url);
    //return this.http.get<ProductList>(this.urlEndpoint+index+"&xpage=10");
  }
  BuscarPersonaByNombre(nombre:string){
    var url="http://localhost:8000/api/persona?page=1&xpage=10&nombre="+nombre;
    return this.http.get<PersonaList>(url);
  }
  BuscarPersonaByDni(dni:string){
  return this.http.get<PersonaList>(`http://localhost:8000/api/persona?page=1&xpage=10&dni=${dni}`);
  }
  CrearPersona(persona:any){
    debugger;
    return this.http.post<any>("http://localhost:8000/api/persona",persona);
  }
}
