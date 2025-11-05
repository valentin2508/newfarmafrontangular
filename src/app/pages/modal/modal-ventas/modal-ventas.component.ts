import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuscarDniService } from '../../../services/buscar-dni.service';
import { PersonasService } from '../../../services/personas.service';
import { persona } from '../../../models/persona';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Venta } from '../../../models/venta.model';
import { VentasService } from '../../../services/ventas.service';
@Component({
  selector: 'app-modal-ventas',
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './modal-ventas.component.html',
  styleUrl: './modal-ventas.component.css'
})

export class ModalVentasComponent {
 dni: string = '';
 persona:persona[]=[];
ventas: Venta[] = [];
 personaTemporal:any[]=[];
 subtotal:number=0;
 totalVenta:number=0;
 igv:number=0
 cambio:number=0;  
 totalVentatemp:number=0;
 metodoPago: string = 'efectivo';
 habilitarBotones: boolean = false;
 loading = false;
  error = '';
  constructor(
    public dialogRef: MatDialogRef<ModalVentasComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
    private BuscardniService: BuscarDniService,
    private Personasservice: PersonasService,
    private VentasService: VentasService
    
  ) {
    console.log("Datos recibidos en el constructor:------------------------", data);
    this.subtotal=data.subTotal.toFixed(2);
    this.igv=data.igv.toFixed(2);
    this.totalVenta=data.constoVenta.toFixed(2);  
    this.totalVentatemp=this.cambio-this.totalVenta;
   }
   get vueltoCalculado(): number 
   {
      const recibido = this.cambio || 0;
      const total = this.totalVenta || 0;
      return recibido - total > 0 ? recibido - total : 0;
  }
   // Método para cambiar el método de pago
cambiarMetodoPago(event: any) {
  this.metodoPago = event.target.value;
  this.cambio = 0; // Reiniciar monto al cambiar método
}

// Verificar si mostrar QR
get mostrarQR(): boolean {
  return this.metodoPago === 'yape';
}

// Verificar si mostrar cuenta
get mostrarCuenta(): boolean {
  return this.metodoPago === 'transferencia';
}

// Verificar si mostrar input normal
get mostrarInputNormal(): boolean {
  return this.metodoPago === 'efectivo';
}

// Datos de cuenta
get datosCuenta(): string {
  return 'BCP: 123-456789-01-23';
}

  
  
  BuscarPersona() { 
    
    this.Personasservice.BuscarPersonaByDni(this.dni).subscribe(
      
      response=>{
        
        if(response.list.length>0 )
          {
              this.persona =response.list;  
              this.habilitarBotones = true;         
          }
          else
          {
            if(this.dni.length==8)
            {
              this.BuscardniService.BuscarDni(this.dni).subscribe(
            response=>{
            this.data=response;
            this.personaTemporal=this.data;
            console.log(this.persona+"----desde response----");
            //realizar registro en la bd persona y cliente
            const persona = {
                  dni: Number(this.data['dni']), 
                  ruc: Number(this.data['dni']),
                  nombre: this.data['nombres'],
                  materno: this.data['apellidoMaterno'],
                  paterno: this.data['apellidoPaterno'],
                  fechanacimiento: "1900-01-01",
                  telefono: "000000000",
                  correo: this.data['nombres']+"@gmail.com",
                  sexo: "",
                  direccion: "Anonimo",
                  tipoPersona:{idtipopersona:1} 
                };            
            this.Personasservice.CrearPersona(persona).subscribe(
              response=>
              {                  
               if(200==response.status)
                {
                    this.Personasservice.BuscarPersonaByDni(this.dni).subscribe(
                    response2=>
                      {
                        this.persona=response2.list
                        this.habilitarBotones = true;
                      });
                }  
              }
            );
           

            });
            }
            else
            {
              alert("DNI no encontrado, Ingrese un DNI válido");
              this.dni='';
              this.persona=[];
              this.habilitarBotones = false; 
            }
          }
        
      })
  }
  ObtenrVeta(){
   this.VentasService.List().subscribe(
     (    response: { correlativo: any; })=>{
      debugger;
      return response.correlativo;
    }
   ); 
  }
  ventaTiket() {
    debugger;
    this.loading = true;
    this.VentasService.List().subscribe({
      next: (data:any) => {

        debugger;
        console.log(data[0]+"venta tiket");
        this.ventas = data;
        this.loading = false;
      },
      error: (error:any) => {
        this.error = 'Error loading ventas';
        this.loading = false;
        console.error('Error:', error);
      }
    });
     //logica para crear una venta
    //sacar venta de la base de datos
    //sacar cliente de la base de datos
    //sacar empleado de la base de datos
    //sacar comprobante de la base de datos tiket=1
    const venta={
    
    serie : "",
    correlativo : "",
    fechaVenta : new Date(),
    igv:   0.0,
    subTotal:   0.0,
    constoVenta:  0.0,
    idCliente: 0,
    idEmpleado:  0,
    idComprobante:  0,
    }
    //logica para crear un detalle de venta
  }

  ventaBoleta(){
    //sacar comprobante de la base de datos boleta=2
  }
  ventaFactura(){}
}
