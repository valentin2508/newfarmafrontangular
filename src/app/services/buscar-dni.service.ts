import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarDniService {

  
  

  constructor(private http:HttpClient) {}
  BuscarDni(dni:string){
    debugger;
   var url1: string=`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impvc2V2YWxlbnRpbjI1MDg5MEBnbWFpbC5jb20ifQ.KOzpNhIge4UAHyJ6vFVFf1mibDbdCYCEOCCu7yzyHIc`;
   var url2: string=`https://api.perudevs.com/api/v1/dni/simple?document=${dni}&key=cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjk1MmFmM2QyNTNhMzA2MGM3ODg1ZTBi`;  
    return this.http.get(url1);
   /* return this.http.get(url1).pipe(
  switchMap(response => {
    debugger;
    const responseStr:any = Object.values(response);
    // Verificar si la respuesta está vacía
    if (responseStr[0] ===false) {
          debugger;
      return this.http.get(url2);
    }
    return of(response); // Devolver la respuesta original
  })
);*/
  }
}
