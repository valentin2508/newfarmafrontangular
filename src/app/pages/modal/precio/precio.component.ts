
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-precio',
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './precio.component.html',
  styleUrl: './precio.component.css'
})

export class PrecioComponent implements OnInit{

 // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  totalVenta: number = 0;
  cantidad: number = 1;
  nombre: string = '';
  stock: number = 0;
  cantidadLlevar: number = 0;
  precioVenta: number = 0;
  precioBlister: number = 0;
  precioCaja: number = 0;

  
  formPrecios: FormGroup | any; // Declara el FormGroup
constructor(
    public dialogRef: MatDialogRef<PrecioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder 
  ) {
    
  }
  ngOnInit(): void {
  
    this.llenarModal();
    this.formPrecios = this.fb.group({
      nombre: [this.nombre],
      stock: [this.stock],
      precioVenta: [this.precioVenta],
      precioBlister: [this.precioBlister],
      precioCaja: [this.precioCaja],
      totalVenta: [this.totalVenta* this.cantidadLlevar],
      PU: ['PU'],
      PB: ['PB'],
      PC: ['PC']
    });
    
    this.formPrecios.get('selectedPriceType')?.valueChanges.subscribe(() => {
      this.calcularTotal();
    });
    this.calcularTotal();

  }
calcularTotal(): void {
    const selectedType = this.formPrecios.get('selectedPriceType')?.value;
    console.log('Selected Price Type:', selectedType);
    let precioBase: number;
    switch (selectedType) {
      case 'pu':
        precioBase = this.data.precioUnitario; // Usar this.data con la capitalización correcta
        console.log('Precio pu:', precioBase);
        break;
      case 'pb':
        precioBase = this.data.precioBlister; // Usar this.data con la capitalización correcta
        console.log('Precio pb:', precioBase);
        break;
      case 'pc':
        precioBase = this.data.precioCaja;   // Usar this.data con la capitalización correcta
        console.log('Precio pc:', precioBase);
        break;
      default:
        precioBase = 0;
    }
    this.totalVenta = this.cantidad * precioBase;
    console.log('Total Venta:', this.totalVenta);
  }
    private llenarModal(): void 
    {
    this.nombre = this.data.producto ;
    this.stock=this.data.Stock;

    this.precioVenta=this.data.precioVenta;
    this.precioBlister=this.data.precioBlister;
    this.precioCaja=this.data.precioCaja;
    this.cantidadLlevar=this.data.cantidadLlevar;
    }

  seleccionarPrecio() {
  
}
agregarProducto(){}
  closeModal(){
   this.dialogRef.close();
  }
 
}
