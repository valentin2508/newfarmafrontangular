import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product';
import { Dialog } from '@angular/cdk/dialog';
import { PrecioComponent } from '../../modal/precio/precio.component';
import { MatDialog } from '@angular/material/dialog';
import { producto } from '../../../models/producto';
@Component({
  selector: 'app-ventas',
  imports: [CommonModule,FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentaComponent implements OnInit {
  //private dialog=inject(Dialog);
 constructor(
    private productoService: ProductoService,private dialog: MatDialog
  )
  {
    
  }
  

  prod: any[] = [];
  total:number=0;
  xpage:number = 0;
  search:string = "";
  codBarra:string = "";
  terminoBusqueda: string = '';
  totalVenta: number = 0;
  subtotal:number=0;
  prodDetalle: Product[] = [];
  elegirPrecio:number=0.0;

  ngOnInit(): void {
    // Datos de ejemplo - en una aplicación real esto vendría de un servicio
    this.vertodos(1); 
  }

   vertodos(index:number):void{
  this.productoService.getProductos(index).subscribe(
    response=>{
      this.prod=response.list;
      this.total=response.total;
      this.xpage=response.xpage;
      //console.log("desde ventas-----"+this.total);
    }
    );
  }

  buscarProducto(): void {
    // Implementar lógica de búsqueda real aquí
    console.log('Buscando:', this.terminoBusqueda);
    // Normalmente harías una llamada a un servicio aquí
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
  
agregarProducto(producto: Product): void {
  
   if (!producto.cantidadLlevar || producto.cantidadLlevar <= 0) {
      alert('La cantidad debe ser mayor a cero');
      return;
    }
    if (producto.cantidadLlevar > producto.stock) {
      alert('No hay suficiente stock');
      return;
    }
   /* this.dialog.open(PrecioComponent, {
    disableClose: true,
    width: '727.4px'
  });
*/
  this.dialog.open(PrecioComponent, {
  disableClose: true,
  width: '727.4px',
  data: { 
    producto: producto.nombre,
    Stock: producto.stock, 
    precioVenta: producto.precioventa,
    precioBlister: producto.precioblister,
    precioCaja: producto.preciocaja,
    cantidadLlevar: producto.cantidadLlevar,
  }
});
    /*if(producto.cantidadLlevar>=10)
    {
      this.elegirPrecio=producto.precioblister;
    }*/
    this.subtotal = producto.precioventa * producto.cantidadLlevar;
   
    this.prodDetalle.push({
        idproducto: producto.idproducto,
        codigoproducto: producto.codigoproducto,
        nombre: producto.nombre,
        vencimiento: producto.vencimiento,
        estado: producto.estado,
        composicion: producto.composicion,
        ubicacion: producto.ubicacion,
        stock: producto.stock,
        precioventa: producto.precioventa,
        precioblister: producto.precioblister,
        preciocaja: producto.precioblister,
        codbarra: producto.codbarra,
        laboratorio:producto.laboratorio,
        presentacion:producto.presentacion,
        unidadMedida:producto.unidadMedida,
        cantidadLlevar:producto.cantidadLlevar
    });
    

    this.calcularTotal();
  }
  eliminarProducto(index: number): void {
    this.prodDetalle.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.totalVenta=this.totalVenta+this.subtotal;
   // this.totalVenta = this.prodDetalle.reduce((sum, item) => sum + this.subtotal, 0);
  }

  finalizarVenta(): void {
    if (this.prodDetalle.length === 0) {
      alert('No hay productos en la venta');
      return;
    }

    // Aquí iría la lógica para guardar la venta
    console.log('Venta finalizada:', this.prodDetalle);
    alert(`Venta finalizada. Total: ${this.totalVenta }`);
    
    // Limpiar la venta después de finalizar
    this.cancelarVenta();
  }

  cancelarVenta(): void {
    if (this.prodDetalle.length === 0 || confirm('¿Estás seguro de cancelar esta venta?')) {
      this.prodDetalle = [];
      this.totalVenta = 0;
    }
  }
  
}