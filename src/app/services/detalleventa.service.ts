import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { detalleventa } from "../models/detalleventa";
import { response } from "express";


@Injectable({
    providedIn:'root'
})
export class detalleventaservice{
    constructor(private http:HttpClient){}
    private url:string="http://localhost:8000/api/detalleventa";
    urlList="http://localhost:8000/api/detalleventa?page=1&xpage=10";

    List(){
        return this.http.get(this.urlList);
    }
    Save(detalle:any){
        return this.http.post<detalleventa>(this.url,detalle,{
            observe: 'response'
        })
    }
}
