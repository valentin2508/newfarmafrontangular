import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cargo, CargoList } from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  List() {
    return this.http.get<CargoList>('/api/cargo?page=1&xpage=100');
  }
}