import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { ComprasComponent } from '../../pages/compras/compras.component';


@Component({
  selector: 'app-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.css'
})
export class PaginateComponent  {
  @Input() total=0;
  @Input() npage:any[]=[];

  public getNumero(index:number) {

    alert("obtiene indice"+index);

  }
 
}
