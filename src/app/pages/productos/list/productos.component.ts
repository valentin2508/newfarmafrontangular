import { Component, OnInit } from '@angular/core';
import { PaginateComponent } from '../../../shared/paginate/paginate.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../../services/producto.service';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-productos',
    standalone: true,
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.css',
    imports: [HttpClientModule,CommonModule,PaginateComponent,FormsModule],
    providers:[ProductoService]
})
export class ProductosComponent implements OnInit{
  prod: any[] = [];
  total:number=0;
  xpage:number = 0;
  current:number = 0;
  pages : any[] = [];
  index:number = 0;
  search:string = "";
  codBarra:string = "";
  constructor(private productoService: ProductoService){
  }
  ngOnInit(): void {
  this.vertodos(1);  
  this.pages = this.generatePageRange();
  }
  onindexClic(index:number){
    this.vertodos(index);
  }
  vertodos(index:number):void{
 
  this.productoService.getProductos(index).subscribe(
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
    const visiblePages = 20; // Número de páginas visibles en la paginación

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
  buscar():void {
    if(this.search.length>0){
      this.productoService.getProductosBySearch(this.search).subscribe(
        response=>{
          this.prod=response.list;
          this.total=response.total;
          this.xpage=response.xpage;
        }
      );
    }
    if(this.codBarra.length>0){
      this.productoService.getProductosByCodBarra(this.codBarra).subscribe(
        response=>{
          this.prod=response.list;
          this.total=response.total;
          this.xpage=response.xpage;
        }
      );
    }
    else{
      this.vertodos(1); 
    }

    
  }
 
}
 