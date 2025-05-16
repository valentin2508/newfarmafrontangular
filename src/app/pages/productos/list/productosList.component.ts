import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaginateComponent } from '../../../shared/paginate/paginate.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { producto } from '../../../models/producto';
import { DatosService } from '../../../services/datos.service';
import { ProductoService } from '../../../services/producto.service';
import { FiltroPipe } from "../../../shared/pipes/filtro.pipe";


@Component({
    selector: 'app-productos',
    standalone: true,
    templateUrl: './productosList.component.html',
    styleUrl: './productosList.component.css',
    imports: [CommonModule, PaginateComponent, FormsModule, DialogModule, RouterModule, FiltroPipe],
    
   
})
export class ProductosListComponent implements OnInit{
  
  visible:boolean;
  constructor(private productoService: ProductoService,private Datosservice:DatosService,private http: HttpClient){
    this.visible = true;
  }

  
  modificado: producto[] = [];
 
  @Output() borrado:EventEmitter<number>=new EventEmitter();
  
  prod: any[] = [];
  total:number=0;
  xpage:number = 0;
 
  current:number = 0;
  pages : any[] = [];
  index:number = 0;
  search:string = "";
  codBarra:string = "";
  modalEditar:boolean = false;
 
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
 
 
  modificarProducto(productIndex:number){
   console.log("LIST-----"+productIndex);
    this.Datosservice.disparadorProducto.emit({
      data:productIndex
    });

    
  }
  eliminarProducto(index:number){
 
    this.productoService.deleteProducto(index).subscribe(o=>{
      this.borrado.emit(index);
    });
  }
 
  
  generatePageRange() {
    let pages_ = [];
    const visiblePages = 33; // Número de páginas visibles en la paginación

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
 