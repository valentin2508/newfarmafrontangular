import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductList } from '../models/product';
import { producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})

export class ProductoService {
 
  //private url: string="https://newfarmabak.azurewebsites.net/api/producto?page=1&xpage=10";
  private url: string="http://localhost:8000/api/producto?page=1&xpage=10";

  private urlEndpoint: string="http://localhost:8000/api/producto?page=";
  constructor(private http: HttpClient) { }

  list(){
    return this.http.get(this.url);
  }
  //devuelve un solo producto por codigo de barra
  get(codBarra: number){
  return this.http.get<ProductList>(this.urlEndpoint + '1&xpage=10&codbarra=' + codBarra);
}
  //devuelve un solo producto por Id
  getProductById(id:number){
    let ListUrlProducto="http://localhost:8000/api/producto/"+id;
    return this.http.get<ProductList>(ListUrlProducto);
  }

  getProductos(index:number){
    return this.http.get<ProductList>(this.urlEndpoint+index+"&xpage=10");
  }
  getProductosBySearch(search:string){
    return this.http.get<ProductList>(this.url+"&search="+search);
  }
  getProductosByCodBarra(codBarra:string){
    return this.http.get<ProductList>(this.url+"&codbarra="+codBarra);
  }
 
  changeProducto(index:number,product:any){
    return this.http.put(`http://localhost:8000/api/${index}`,product);
  }
  saveProducto(data:producto){
    let save_url="http://localhost:8000/api";
    return this.http.post<producto>(save_url, data,{
      observe:'response'
    });
  }
  deleteProducto(index:number){
    console.log("---------------",index);
    let del_url="http://localhost:8000/api/producto/"+index;
    return this.http.delete<ProductList>(del_url);
  }
 createProducto(product:any){
   //return this.http.post('http://localhost:8000/api',product);
   let save_url="http://localhost:8000/api/producto";
                        
   return this.http.post<any>(save_url, product,{
     observe:'response'
   });
   
  }
}
