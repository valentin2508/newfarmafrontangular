import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DetalleVenta } from "../models/detalleventa";
import { response } from "express";


@Injectable({
    providedIn:'root'
})
export class DetalleVentaService{
    constructor(private http:HttpClient){}
    private url:string="/api/detalleventa";
    urlList="/api/detalleventa?page=1&xpage=10";

    List(){
        return this.http.get(this.urlList);
    }
    Save(detalle:any){
        return this.http.post<DetalleVenta>(this.url,detalle,{
            observe: 'response'
        })
    }
}
