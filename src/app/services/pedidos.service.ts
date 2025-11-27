import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

   constructor(private http: HttpClient) { }
  private url: string = "http://localhost:8000/api/pedido";

  urlList="http://localhost:8000/api/pedido?page=1&xpage=10";
    List(){
      return  this.http.get<Venta>(this.urlList);

    }
  savePedido(venta: Venta)
  {
    console.log("Datos de pedido a enviar:", venta);
    return this.http.post<PedidosService>(this.url, venta, {
      observe: 'response'
    });
  }
}