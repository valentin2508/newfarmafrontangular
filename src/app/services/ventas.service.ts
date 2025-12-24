import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta, ventaList } from '../models/venta.model';
import { RespuestaVenta } from '../models/RespuestaVenta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  result: any;
   constructor(private http: HttpClient) { }
   private url: string = "/api/venta";

   urlList="/api/venta";
List(page: number, xpage: number){
      return  this.http.get<ventaList>(`${this.urlList}?page=${page}&xpage=${xpage}`);
     
    }
   
saveVenta(venta: any) 
  {
    console.log("Datos de venta a enviar:", venta);
    return this.http.post<RespuestaVenta>(this.url, venta, {
      observe: 'response',
      
    });
  }
}
