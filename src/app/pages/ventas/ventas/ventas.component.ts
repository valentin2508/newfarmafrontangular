import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../models/product';
import { Dialog } from '@angular/cdk/dialog';
import { PrecioComponent } from '../../modal/precio/precio.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VentasService } from '../../../services/ventas.service';
import { Venta } from '../../../models/venta.model';
import { ModalVentasComponent } from '../../modal/modal-ventas/modal-ventas.component';
@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
  providers:[{ provide: LOCALE_ID, useValue: "en-US" },VentasService]
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
 // subtotal:number=0;
  prodDetalle: Product[] = [];
  elegirPrecio:number=0.0;
  // Variables para el proceso de venta
  procesoEnCurso = false;
  mensaje: string | null = null;
  error = false;
private ventasService=inject(VentasService);
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
 
    console.log('Buscando:', this.terminoBusqueda);
   
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
    else if(this.codBarra.length>0){
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
  
  const datosRecibidos =this.dialog.open(PrecioComponent,{
  disableClose: true,
  maxWidth: '727.4px',
  data:producto
});

datosRecibidos.afterClosed().subscribe(resultado => {
      if (resultado !== undefined && resultado !== null) { // Check for undefined and null results
        
        const existingProductIndex = this.prodDetalle.findIndex(
          item => item.idproducto === resultado.idproducto && item.tipoPrecioSeleccionado === resultado.tipoPrecioSeleccionado
        );
        if (existingProductIndex > -1) {
          const existingItem = this.prodDetalle[existingProductIndex];
          existingItem.cantidadLlevar += resultado.cantidadLlevar;
          existingItem.subTotal += resultado.subTotal; 
        } else {
          console.log("Datos recibidos desde el diálogo final-----:", resultado);
          this.prodDetalle.push(resultado);
        }
        this.calcularTotalGeneral();
      } else {
        console.log("Modal cerrado sin datos o cancelado.");
      }
    });
  }
  eliminarProducto(index: number): void {
    if (index >= 0 && index < this.prodDetalle.length) {
      this.prodDetalle.splice(index, 1);
      this.calcularTotalGeneral(); // Recalculate total after removal
    }
  }
calcularTotalGeneral(): void {
    this.totalVenta = this.prodDetalle.reduce((sum, item) => sum + item.subTotal, 0);
  }
  
  

   finalizarVenta(): void {
   if (this.prodDetalle.length === 0) {
      alert('No hay productos en la venta');
      return;
    }
    
    console.log('Venta finalizada:', this.prodDetalle);
    alert(`Venta finalizada. Total: ${this.totalVenta}`); // Consider using MatDialog for alerts

    this.cancelarVenta(); // Clear the sale after finalizing
  }

  agregarProductosAVenta() {
    this.procesoEnCurso = true;
    this.mensaje = 'Creando la venta...';
    this.error = false;

    try {
 
       
        const modalVenta =this.dialog.open(ModalVentasComponent, {
        maxWidth: '800px',
        data: this.prodDetalle
        });
   

      this.mensaje = `✅ Todos los productos han sido agregados a la Venta ${1} exitosamente.`;
    } catch (err: any) {
      this.error = true;
      this.mensaje = `❌ Error: ${err.message}`;
    } finally {
      this.procesoEnCurso = false;
    }
  }

  cancelarVenta(): void {
    if (this.prodDetalle.length === 0 || confirm('¿Estás seguro de cancelar esta venta?')) {
      this.prodDetalle = [];
      this.totalVenta = 0;
    }
  }
  
}