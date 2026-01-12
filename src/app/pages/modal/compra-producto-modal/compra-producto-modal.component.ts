import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../../../models/product';
import { DetalleCompraService } from '../../../services/detallecompra.service';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
@Component({
  selector: 'app-compra-producto-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './compra-producto-modal.component.html',
  styleUrls: ['./compra-producto-modal.component.css']
})
export class CompraProductoModalComponent implements OnInit {
  producto: Product;
  idproducto:number=0;
  cantidadComprar: number = 1;
  precioCompra: number = 0;
  precioVentaUnidad: number = 0;
  precioVentaBlister: number = 0;
  precioVentaCaja: number = 0;
  fechaVencimiento: string = '';
  ubicacion: string = '';
  composicion: string = '';
  codigoBarra: string = '';

  constructor(
    public dialogRef: MatDialogRef<CompraProductoModalComponent>,
    private toastr: ToastrService,
    private DetalleCompraService: DetalleCompraService,
    @Inject(MAT_DIALOG_DATA) public data: { producto: Product }
  ) {
    this.producto = { ...data.producto };
    this.idproducto=this.producto.idproducto || 0;
   // this.precioCompra = null || 0;
     this.precioVentaUnidad = this.producto.precioventa || 0;
     this.precioVentaBlister = this.producto.precioblister || 0;
     this.precioVentaCaja = this.producto.preciocaja || 0;
     debugger
     if (this.producto.vencimiento && (this.producto.vencimiento instanceof Date || typeof this.producto.vencimiento === 'string') && !isNaN(new Date(this.producto.vencimiento).getTime())) {
       this.fechaVencimiento = formatDate(this.producto.vencimiento, 'yyyy-MM-dd', 'en-US');
     } else {
       this.fechaVencimiento = '';
     }
        debugger
    //formatDate(Date.now(), 'yyyy-dd-MM', 'en-US');
    this.ubicacion = this.producto.ubicacion || '';
    this.composicion = this.producto.composicion || '';
    this.codigoBarra = this.producto.codbarra || '';
  }

  ngOnInit(): void {
    console.log("producto en modal compra----"+this.idproducto);
    this.loadLastPrecioCompra(this.idproducto);
  }
  incrementQuantity(): void {
    this.cantidadComprar++;
  }
  decrementQuantity(): void {
    if (this.cantidadComprar > 1) {
      this.cantidadComprar--;
    }
  }
  loadLastPrecioCompra(ProductId: number):void{
    this.DetalleCompraService.getLastPrecioCompra(ProductId).subscribe(
      response=>{
        debugger;
          this.precioCompra=response.lastCost? response.lastCost : 0;
      }
    );  
  }
  addToPurchase(): void {
  if(!this.precioCompra || this.precioCompra <=0){
     this.toastr.warning("El precio de compra debe ser mayor a cero.");
    return;
  }

    const subTotal = this.cantidadComprar * this.precioCompra;

    this.dialogRef.close({
      ...this.producto,
      lote: 0,
      cantidadLlevar: this.cantidadComprar,
      preciocompra: this.precioCompra,
      precioventa: this.precioVentaUnidad,
      precioblister: this.precioVentaBlister,
      preciocaja: this.precioVentaCaja,
      vencimiento: this.fechaVencimiento,
      ubicacion: this.ubicacion,
      composicion: this.composicion,
      codbarra: this.codigoBarra,
      subTotal: subTotal
    });
  }
}