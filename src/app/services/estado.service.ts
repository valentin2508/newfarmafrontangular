import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoList } from '../models/estado';
import { Pedido } from '../models/pedido';

@Injectable({
    providedIn: 'root'
 })
export class EstadoService 
{
  constructor(private http: HttpClient) { }
  private url: string = "/api/estado?page=1&xpage=10";    

  List()
       {
         return this.http.get<EstadoList>(this.url);
       }
  savePedido(pedido: Pedido)
  {
    console.log("Datos de pedido a enviar:", pedido);
    return this.http.post<EstadoService>(this.url, pedido, {
      observe: 'response'
    });
  }
}