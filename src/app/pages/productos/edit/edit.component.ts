import { Component,Input,OnInit, Pipe } from '@angular/core';
import { SwithService } from '../../../services/swith.service';
import { CommonModule } from '@angular/common';
import { ProductList } from '../../../models/product';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  @Pipe({
    name: 'valueArray',
  })
  list:ProductList[]=[];
  id:number =0;
  nombre:string = '';
  constructor(private modal:SwithService){}
  @Input() prodEntrante:ProductList[] = [];
  ngOnInit(): void{
    //this.prodEntrante=this.data;
    console.log(this.prodEntrante);
    this.list =Object.values(this.prodEntrante);
  }
  
  closeModal(){
    this.modal.$modal.emit(false);
  }
}
