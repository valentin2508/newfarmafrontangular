import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PresentacionList } from '../models/presentacion';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {
  private url: string="http://localhost:8000/api/presentacion?page=1&xpage=600";

  constructor(private http:HttpClient) {}

  list(){
    return this.http.get<PresentacionList>(this.url);
  }

  getPresentacion(index:number){
    return this.http.get<PresentacionList>(this.url+index+"&xpage=10");
  }
}
