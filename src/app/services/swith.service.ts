import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SwithService {
  constructor() { }
  $modal=new EventEmitter<any>();
}
