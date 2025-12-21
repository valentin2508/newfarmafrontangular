import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LaboratorioList } from '../models/laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {

  private url: string="/api/laboratorio?page=1&xpage=600";
                              

  constructor(private http:HttpClient) {}

  list(){
    return this.http.get<LaboratorioList>(this.url);
  }

  getPresentacion(index:number){
    return this.http.get<LaboratorioList>(this.url);
  }
}
