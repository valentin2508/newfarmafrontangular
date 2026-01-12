import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra, CompraList } from '../models/compra';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  result: any;
   constructor(private http: HttpClient) { }
   private url: string = "/api/compra";

   urlList="/api/compra";
List(page: number, xpage: number){
      return  this.http.get<CompraList>(`${this.urlList}?page=${page}&xpage=${xpage}`);

    }

saveCompra(compra: any)
  {
    console.log("Datos de compra a enviar:", compra);
    return this.http.post<any>(this.url, compra, {
      observe: 'response',

    });
  }
}