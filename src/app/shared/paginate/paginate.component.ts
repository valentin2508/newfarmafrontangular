import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';



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
  @Output() SendIndex : EventEmitter<number> = new EventEmitter<number>();
  public getNumero(index:number) {
    this.SendIndex.emit(index);
  }
 
}
