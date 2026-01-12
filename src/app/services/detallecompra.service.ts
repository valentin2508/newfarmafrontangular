import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DetalleCompra,DetalleCompraList } from "../models/detallecompra";

@Injectable({
    providedIn:'root'
})
export class DetalleCompraService
{
    constructor(private http:HttpClient){}
    private url:string="/api/detallecompra";
    urlList="/api/detallecompra?page=1&xpage=10";
    List(){
        return this.http.get<DetalleCompraList>(this.urlList);
    }
    Save(detalle:any){
        return this.http.post<DetalleCompra>(this.url,detalle,{
            observe: 'response'
        })
    }
    getDetallesPorCompra(compraId: number){
        return this.http.get<DetalleCompraList>(`${this.url}/${compraId}`);
    }
    getLastPrecioCompra(ProductId: number){
        return this.http.get<DetalleCompraList>(`${this.url}/producto/${ProductId}`);
    }
}