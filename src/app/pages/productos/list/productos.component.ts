import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { PaginateComponent } from '../../../shared/paginate/paginate.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { EditComponent } from '../edit/edit.component';
import { SwithService } from '../../../services/swith.service';
import { ProductList } from '../../../models/product';


@Component({
    selector: 'app-productos',
    standalone: true,
    templateUrl: './productos.component.html',
    styleUrl: './productos.component.css',
    imports: [HttpClientModule,CommonModule,PaginateComponent,FormsModule,EditComponent],
    providers:[ProductoService]
})
export class ProductosComponent implements OnInit{
  constructor(private productoService: ProductoService,private modal:SwithService,private http: HttpClient){
  }
  modificado: ProductList[] = [];
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
  this.modal.$modal.subscribe((valor)=>{
    this.modalEditar=valor;
  })
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
  modificarProducto(data:ProductList[]):void{
    //llamado al modal
    this.modalEditar=true;
    this.modificado=data;
  }
  eliminarProducto(index:number){
 
    this.productoService.deleteProducto(index).subscribe(o=>{
      this.borrado.emit(index);
    });
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
 