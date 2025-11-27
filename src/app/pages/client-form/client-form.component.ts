import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { PedidosService } from '../../services/pedidos.service';
import { BuscarDniService } from '../../services/buscar-dni.service';
import { Venta } from '../../models/venta.model';
import { persona } from '../../models/persona';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
persona:persona[]=[];
personaTemporal:any[]=[];
public data: any

  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    private router: Router,
    private toastr: ToastrService,
    private cartService: CartService,
    private pedidosService: PedidosService,
    private buscarDniService: BuscarDniService
  ) {
    this.clientForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      ruc: ['', [Validators.pattern(/^\d{11}$/)]],
      nombre: ['', Validators.required],
      materno: ['', Validators.required],
      paterno: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      sexo: ['', Validators.required],
      direccion: ['', Validators.required],
      tipoPersona: [null] // Se setea automáticamente en onSubmit
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const clientData = this.clientForm.value;
      // Asumir tipoPersona id, por ejemplo cliente
      clientData.tipoPersona = { idtipopersona: 1, nombre: 'Cliente' };

      this.personasService.CrearPersona(clientData).subscribe({
        next: (response: any) => {
          this.toastr.success('Cliente registrado exitosamente');
          // Obtener idCliente de la respuesta
          const idCliente = response.idpersona || response.id;
          // Crear el pedido
          this.createPedido(idCliente);
        },
        error: (error) => {
          this.toastr.error('Error al registrar cliente');
          console.error(error);
        }
      });
    } else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }
/*
  buscarDni(): void {
    const dni = this.clientForm.get('dni')?.value;
    if (dni && dni.length === 8) {
      this.buscarDniService.BuscarDni(dni).subscribe({
        next: (data: any) => {
          this.clientForm.patchValue({
            nombre: data.nombres,
            paterno: data.apellidoPaterno,
            materno: data.apellidoMaterno
          });
          this.toastr.success('Datos del DNI cargados');
        },
        error: (error) => {
          this.toastr.error('Error al buscar DNI');
          console.error(error);
        }
      });
    } else {
      this.toastr.warning('Ingrese un DNI válido de 8 dígitos');
    }
  }*/
BuscarPersona() { 
    const dni = this.clientForm.get('dni')?.value;
    this.personasService.BuscarPersonaByDni(dni).subscribe(
      response=>{
        
        if(response.list.length>0 )
          {
            this.persona =response.list; 
           //debugger;
            console.log("--------------------"+this.persona[0].nombre);
            this.clientForm.patchValue({
            nombre: this.persona[0].nombre,
            paterno: this.persona[0].paterno,
            materno: this.persona[0].materno,
            fechanacimiento: this.persona[0].fechanacimiento,
            telefono: this.persona[0].telefono,
            correo: this.persona[0].correo,
            sexo: this.persona[0].sexo,
            direccion: this.persona[0].direccion
          });
          }
          else
          {
            
            this.buscarDniService.BuscarDni(dni).subscribe(
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
            this.personasService.CrearPersona(persona).subscribe(
              response=>
              {                  
               if(200==response.status)
                {
                    this.personasService.BuscarPersonaByDni('dni').subscribe(
                    response2=>
                      {
                        this.persona=response2.list
                     
                      });
                }  
              }
            );
           

            });
           
          }
        
      })
  }
  private createPedido(idCliente: number): void {
    const cartItems = this.cartService.getCartItems();
    const total = this.cartService.getTotal();
    // Calcular subtotal, igv, etc. Asumir igv 18%
    const igv = total * 0.18;
    const subTotal = total - igv;

    const venta: Venta = {
      idventa: 0,
      serie: '001', // Asumir
      correlativo: '0001', // Asumir
      fechaventa: new Date(),
      igv: igv,
      subtotal: subTotal,
      costoventa: total,
      cliente: {idcliente: idCliente},
      empleado: {idempleado:1}, // Asumir
      tipoComprobante:{idtipocomprobante:1} // Asumir
    };

    this.pedidosService.savePedido(venta).subscribe({
      next: (response) => {
        this.toastr.success('Pedido registrado exitosamente');
        this.cartService.clearCart();
        this.router.navigate(['/orders']); // Navegar a orders
      },
      error: (error) => {
        this.toastr.error('Error al realizar el pedido');
        console.error(error);
      }
    });
  }
}