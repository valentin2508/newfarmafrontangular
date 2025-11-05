import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CantidadComponent } from '../cantidad/cantidad.component';

@Component({
  selector: 'app-precio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [FormBuilder],
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.css']
})
export class PrecioComponent implements OnInit {
  totalVenta = 0;
  cantidad = 1;
  idproducto = 0;
  nombre = '';
  vencimiento = '';
  stock = 0;
  cantidadLlevar = 0;
  precioventa = 0;
  precioBlister = 0;
  precioCaja = 0;
  productoSeleccionado: any = null;
  productoSeleccionadopc: any = null;
  precioBase = 0;
  precioFraccion=0;
  formPrecios!: FormGroup;

  constructor(
  public dialogRef: MatDialogRef<PrecioComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private dialog: MatDialog
) {
  console.log("Datos recibidos en el constructor:", data);
}

  ngOnInit(): void {
    this.llenarModal();

    this.formPrecios = this.fb.group({
      idproducto: [this.data.idproducto],
      nombre: [this.nombre],
      stock: [this.stock],
      cantidadLlevar: [this.cantidadLlevar],
      precioventa: [this.precioventa],
      precioBlister: [this.precioBlister],
      precioCaja: [this.precioCaja],
      selectedPriceType: ['PU'],
      precioUnitarioDisplay: [this.precioventa],
      precioBlisterDisplay: [this.precioBlister],
      precioCajaDisplay: [this.precioCaja]
    });

    this.formPrecios.get('selectedPriceType')?.valueChanges.subscribe(() => {
      console.log('Tipo de precio cambiado---------------------');
      this.calcularTotal();
    });
    this.calcularTotal();
  }
  private llenarModal(): void {
    this.nombre = this.data.nombre;
    this.stock = this.data.stock;
    this.precioventa = this.data.precioventa;
    this.precioBlister = this.data.precioblister;
    this.precioCaja = this.data.preciocaja;
    this.cantidadLlevar = this.data.cantidadLlevar;
  }
  calcularTotal(): void {
    
    const selectedType = this.formPrecios.get('selectedPriceType')?.value;
    this.precioBase = 0;
    switch (selectedType) {
      case 'PU':
        this.precioBase = this.data.precioventa;
        this.precioFraccion=this.precioBase;
        break;
      case 'PB':
        this.precioBase = this.data.precioblister;
       if (this.productoSeleccionado !== null) 
        {
          this.totalVenta=(this.precioBase/this.productoSeleccionado.cantidad)*this.cantidadLlevar;
          return;
        }
      else
      {
       
        const dialogRef1= this.dialog.open(CantidadComponent,{
          disableClose: true,
          data:{
            etiqueta: 'Blister',
            cantidad: 10
          }
        });
        dialogRef1.afterClosed().subscribe(resultado=>
          {
            
            if (resultado !== undefined ) 
              {                
                if (this.cantidadLlevar >= resultado.cantidad) 
                {
                  this.productoSeleccionado = resultado;
                  this.precioFraccion = this.precioBase / resultado.cantidad;
                  this.precioventa=(this.precioBase/resultado.cantidad)*this.cantidadLlevar;
                  console.log('PU---total venta', this.totalVenta, 'precio base', this.precioBase, 'resulatdo.cant', resultado.cantidad, 'cantidad llevar', this.cantidadLlevar);
                  return;
                } 
                else 
                {
                  this.cantidadLlevar= resultado.cantidad;
                  this.precioventa=(this.precioBase/resultado.cantidad)*this.cantidadLlevar;
                  this.precioFraccion = this.precioBase / resultado.cantidad;
                  return;
                }
              }
        })       
        break;
      }
      case 'PC':
        this.precioBase = this.data.preciocaja;
        if (this.productoSeleccionadopc !== null) 
        {
          this.totalVenta=(this.precioBase/this.productoSeleccionadopc.cantidad)*this.cantidadLlevar;
          return;
        }
       const dialogRef= this.dialog.open(CantidadComponent,{
          disableClose: true,
          data:{
            etiqueta: 'Caja',
            cantidad: 100
          }
        });
        dialogRef.afterClosed().subscribe(resultado=>{
          if (resultado !== undefined) 
            { 
              if(this.cantidadLlevar >= resultado.cantidad) 
              {
                this.productoSeleccionadopc = resultado;
                this.precioFraccion = this.precioBase / this.productoSeleccionadopc.cantidad;
                this.totalVenta=(this.precioBase/resultado.cantidad)*this.cantidadLlevar;
                console.log('PC--total venta', this.totalVenta, 'precio base', this.precioBase, 'resulatdo.cant', resultado.cantidad, 'cantidad llevar', this.cantidadLlevar);
                return;
              }else 
              {
                
                this.cantidadLlevar= resultado.cantidad;
                this.precioventa=(this.precioBase/resultado.cantidad)*this.cantidadLlevar;
                this.precioFraccion = this.precioBase / this.productoSeleccionadopc.cantidad;
                return;
              }
            }
        })
        break;
    }
    
    this.totalVenta = this.cantidadLlevar * this.precioFraccion;
  }
  agregar() {
    
    this.dialogRef.close(
      {
        idproducto: this.data.idproducto,
        codigoproducto: this.data.codigoproducto,
        nombre: this.formPrecios.value.nombre,
        vencimiento: this.data.vencimiento,
        estado: this.data.estado,
        composicion: this.data.composicion,
        ubicacion: this.data.ubicacion,
        presentacion: this.data.presentacion,
        unidadMedida: this.data.unidadMedida,
        laboratorio: this.data.laboratorio,
        precioventa: this.precioFraccion,
        cantidadLlevar: this.cantidadLlevar,
        codbarra: this.data.codbarra,
        subTotal: this.totalVenta,
        stock: this.data.stock,
      }
    );
   
  }
}
