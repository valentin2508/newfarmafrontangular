import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscarDniService {

  
  

  constructor(private http:HttpClient) {}
  BuscarDni(dni:string){
    debugger;
   var url: string=`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvc2V2YWxlbnRpbjI1MDg5MEBnbWFpbC5jb20ifQ.KOzpNhIge4UAHyJ6vFVFf1mibDbdCYCEOCCu7yzyHIc`;
    return this.http.get(url);
  }
}
