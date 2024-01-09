import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductList } from '../models/product';


@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  
 
  //private url: string="https://newfarmabak.azurewebsites.net/api/producto?page=1&xpage=10";
  private url: string="http://localhost:8000/api/producto?page=1&xpage=10";

  private urlEndpoint: string="http://localhost:8000/api/producto?page=";
  constructor(private http: HttpClient) { }
  getProductos(index:number){
    return this.http.get<ProductList>(this.urlEndpoint+index+"&xpage=10");
  }
  getProductosBySearch(search:string){
    return this.http.get<ProductList>(this.url+"&search="+search);
  }
  getProductosByCodBarra(codBarra:string){
    return this.http.get<ProductList>(this.url+"&codbarra="+codBarra);
  }
}
