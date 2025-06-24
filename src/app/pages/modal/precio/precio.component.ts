
import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  formPrecios: FormGroup | undefined; // Declara el FormGroup
constructor(
    public dialogRef: MatDialogRef<PrecioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrecioComponent, // Inyecta los datos
   // private fb: FormBuilder // Inyecta FormBuilder
  ) {}
private fb = inject(FormBuilder);


  nombre: string = '';
  stock: number = 0;
  cantidadLlevar: number = 0;
  precioVenta: number = 0;
  precioBlister: number = 0;
  precioCaja: number = 0;

  PU:string='';
  PB:string='';
  PC:string='';

  ngOnInit(): void {
    this.llenarModal();    
    
  }
 form=this.fb.group({
    precioVenta:this.data.precioVenta,
    precioBlister:this.data.precioBlister,
    precioCaja:this.data.precioCaja,
    PU:"PU",
    PB:"PB",
    PC:"PC",
   });

    private llenarModal(): void 
    {
    this.nombre=this.data.nombre;
    this.stock=this.data.stock;
    //this.precioVenta=this.data.precioVenta;
    //this.precioBlister=this.data.precioBlister;
    //this.precioCaja=this.data.precioCaja;
    this.cantidadLlevar=this.data.cantidadLlevar;
    console.log("nnnnnnnnnnnnnnnnn",this.data);
    }

  seleccionarPrecio() {
  
}
agregarProducto(){}
  closeModal(){
   this.dialogRef.close();
  }
 
}
