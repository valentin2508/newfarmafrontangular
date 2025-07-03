import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
    MatButtonModule
  ],
  providers: [FormBuilder],
  templateUrl: './precio.component.html',
  styleUrls: ['./precio.component.css']
})
export class PrecioComponent implements OnInit {
  totalVenta = 0;
  cantidad = 1;
  nombre = '';
  stock = 0;
  cantidadLlevar = 0;
  precioVenta = 0;
  precioBlister = 0;
  precioCaja = 0;

  formPrecios!: FormGroup;

  constructor(
  public dialogRef: MatDialogRef<PrecioComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private fb: FormBuilder,
  private dialog: MatDialog
) {}

  ngOnInit(): void {
    this.llenarModal();

    this.formPrecios = this.fb.group({
      nombre: [this.nombre],
      stock: [this.stock],
      cantidadLlevar: [this.cantidadLlevar],
      precioVenta: [this.precioVenta],
      precioBlister: [this.precioBlister],
      precioCaja: [this.precioCaja],
      selectedPriceType: ['PU'],
      precioUnitarioDisplay: [this.precioVenta],
      precioBlisterDisplay: [this.precioBlister],
      precioCajaDisplay: [this.precioCaja]
    });

    this.formPrecios.get('selectedPriceType')?.valueChanges.subscribe(() => {
      this.calcularTotal();
    });

    this.calcularTotal();
  }

  private llenarModal(): void {
    this.nombre = this.data.producto;
    this.stock = this.data.Stock;
    this.precioVenta = this.data.precioVenta;
    this.precioBlister = this.data.precioBlister;
    this.precioCaja = this.data.precioCaja;
    this.cantidadLlevar = this.data.cantidadLlevar;
  }

  calcularTotal(): void {
    const selectedType = this.formPrecios.get('selectedPriceType')?.value;
    const cantidad = this.formPrecios.get('cantidadLlevar')?.value || 1;
    console.log('selectedType:', selectedType);
    let precioBase = 0;
    switch (selectedType) {
      case 'PU':
        precioBase = this.data.precioVenta;
        break;
      case 'PB':
        this.dialog.open(CantidadComponent,{
          disableClose: true,
          data:{
            etiqueta: 'Blister',
          }
        });
        
        precioBase = this.data.precioBlister;
        break;
      case 'PC':
        precioBase = this.data.precioCaja;
        break;
    }

    this.totalVenta = cantidad * precioBase;
  }

  closeModal() {
    this.dialogRef.close();
  }

  agregarProducto() {
    // Aquí puedes emitir los datos seleccionados si los necesitas
    this.dialogRef.close(this.formPrecios.value);
  }
}
