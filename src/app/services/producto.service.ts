import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductList } from '../models/product';


@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  public static _index: number = 1;
  
  public static get index(): number {
    return ProductoService._index;
  }
  public static set index(value: number){
    this._index=value;
  }
 
  //private urlEndpoint: string="https://newfarmabak.azurewebsites.net/api/producto?page=1&xpage=10";

  private urlEndpoint: string="http://localhost:8000/api/producto?page=";
  constructor(private http: HttpClient) { }
  getProductos(){
    console.log("--------"+ProductoService.index);
    return this.http.get<ProductList>(this.urlEndpoint+ProductoService.index+"&xpage=10");
  }
}
