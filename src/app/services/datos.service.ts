import {EventEmitter,Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  @Output() disparadorProducto:EventEmitter<any> = new EventEmitter();
  constructor() { }
  private idProducto: number=0;

  setIdProducto(id:number){
    this.idProducto = id;
  }

  /*deleteProducto(index:number){
    console.log("---------------",index);
    let del_url="http://localhost:8000/api/producto/"+index;
    return "";
  }*/

  get getIdProducto():number {
    return this.idProducto;
  }
  
}
