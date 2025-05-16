import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnidadMedidaList } from '../models/unidadmedida';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {

  private url: string="http://localhost:8000/api/unidadmedida?page=1&xpage=600";
                              

  constructor(private http:HttpClient) {}

  list(){
    return this.http.get<UnidadMedidaList>(this.url);
  }

  getPresentacion(index:number){
    return this.http.get<UnidadMedidaList>(this.url+index+"&xpage=10");
  }


}
