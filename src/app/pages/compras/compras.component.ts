import { Component, Input, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../../shared/paginate/paginate.component';


@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [HttpClientModule,CommonModule,PaginateComponent],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css',
  providers:[ProductoService]
})
export class ComprasComponent implements OnInit {

  prod: any[] = [];
  total:number=0;
  xpage:number = 0;
  current:number = 0;
  pages : any[] = [];
  index:number = 0;
  constructor(private productoService: ProductoService){
  }
  ngOnInit(): void {
  this.vertodos();  
  this.pages = this.generatePageRange();
  }
  vertodos():void{
 
  this.productoService.getProductos().subscribe(
    response=>{
      this.prod=response.list;
      this.total=response.total;
      this.xpage=response.xpage;
    }
    );
  }
  editar(){
    
    //abrir modal de editar producto
  }
  eliminar(){
    //abrir modal de eliminar producto
  }
  generatePageRange() {
    let pages_ = [];
    const visiblePages = 5; // Número de páginas visibles en la paginación

    const totalPages = Math.ceil(this.total / this.xpage);
    const middlePage = Math.ceil(visiblePages / 2);
    let startPage = this.current - middlePage + 1;
    let endPage = this.current + middlePage - 1;

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(visiblePages, totalPages);
    } else if (endPage > totalPages) {
      startPage = Math.max(totalPages - visiblePages + 1, 1);
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages_.push(i);
    }
    return pages_;
  }
}
