
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
      PU: ['PU'],
      PB: ['PB'],
      PC: ['PC']
    });
    
  }

    private llenarModal(): void 
    {
    this.nombre = this.data.producto ;
    this.stock=this.data.Stock;

    this.precioVenta=this.data.precioVenta;
    this.precioBlister=this.data.precioBlister;
    this.precioCaja=this.data.precioCaja;
    this.cantidadLlevar=this.data.cantidadLlevar;
     console.log("Datos recibidos en llenarModal:", this.nombre);
    }

  seleccionarPrecio() {
  
}
agregarProducto(){}
  closeModal(){
   this.dialogRef.close();
  }
 
}
