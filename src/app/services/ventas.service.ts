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
 ListWithFilters(page: number, xpage: number, filters: { serie?: string, correlativo?: string, search?: string }){
       let query = `${this.urlList}?page=${page}&xpage=${xpage}`;
       if (filters.serie) query += `&serie=${filters.serie}`;
       if (filters.correlativo) query += `&correlativo=${filters.correlativo}`;
       if (filters.search) query += `&search=${filters.search}`;
       return this.http.get<ventaList>(query);
     }

saveVenta(venta: any) 
  {
    console.log("Datos de venta a enviar:", venta);
    return this.http.post<RespuestaVenta>(this.url, venta, {
      observe: 'response',
      
    });
  }
}
