import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  result: any;
   constructor(private http: HttpClient) { }
  private url: string = "http://localhost:8000/api/venta";

  urlList="http://localhost:8000/api/venta?page=1&xpage=10";
    List(){
      return  this.http.get<Venta>(this.urlList);
      
    }

    
  saveVenta(venta: Venta) 
  {
    console.log("Datos de venta a enviar:", venta);
    return this.http.post<VentasService>(this.url, venta, {
      observe: 'response'
    });
  }
}
