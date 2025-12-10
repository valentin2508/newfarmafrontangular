import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../models/venta.model';
import { pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

   constructor(private http: HttpClient) { }
  private url: string = "/api/pedido";

  urlList="/api/pedido?page=1&xpage=10";
    List(){
      const result=this.http.get<pedido>(this.urlList);
      console.log(result);
      debugger;
      return  result;
    }
  savePedido(venta: Venta)
  {
    console.log("Datos de pedido a enviar:", venta);
    return this.http.post<PedidosService>(this.url, venta, {
      observe: 'response'
    });
  }
}