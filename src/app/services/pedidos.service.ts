import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../models/venta.model';
import { Pedido, PedidoList } from '../models/pedido';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

   constructor(private http: HttpClient) { }
    private url: string = "/api/pedido";
    urlcount= "/api/pedido";
     urlList ="/api/pedido?page=1&xpage=100";
      List()
      {
        return this.http.get<PedidoList>(this.urlList);
      }
     lastPedido(){
      debugger;
      return this.http.get<string>(this.urlcount+"/lastpedido");
     }
  savePedido(venta: Venta)
  {
    console.log("Datos de pedido a enviar:", venta);
    return this.http.post<PedidosService>(this.url, venta, {
      observe: 'response'
    });
  }
}