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
import { pedido } from '../../models/pedido';
import moment from 'moment';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  idcliente:number=0;
 dni: string = '';
persona:persona[]=[];
personaTemporal:any[]=[];
public data: any

  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    private ClienteService:ClienteService,
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
    debugger
    if (this.clientForm.valid) 
      {
        debugger
        this.createPedido(this.idcliente);
      } 
    else {
      this.toastr.warning('Por favor, complete todos los campos requeridos');
    }
  }

  BuscarPersona() { 
    debugger;
    const dni = this.clientForm.get('dni')?.value;
    this.personasService.BuscarPersonaByDni(dni).subscribe(
      response=>{
        debugger;
          //si esta en la bd
        if(response.list.length>0 )
          {
            
              this.persona =response.list;  
              //this.habilitarBotones = true;      
             debugger;
              this.ClienteService.listarByIdPersona(this.persona[0].idpersona).subscribe(responseCliente=>{
                debugger;
                //si es un cliente muestra los datos en el form
                if(responseCliente.list.length>0)
                {
                  this.idcliente=responseCliente.list[0].idcliente
                  this.clientForm.patchValue({
                  idpersona: this.persona[0].idpersona,
                  nombre: this.persona[0].nombre,
                  paterno: this.persona[0].paterno,
                  materno: this.persona[0].materno,
                  //moment(response.list[0].vencimiento, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                  fechanacimiento: this.persona[0].fechanacimiento,
                  telefono: this.persona[0].telefono,
                  correo: this.persona[0].correo,
                  sexo: this.persona[0].sexo,
                  direccion: this.persona[0].direccion
          });
                }
                else{
                  const Cliente={
                    persona:{
                      idpersona: this.persona[0].idpersona
                    }
                  }
                  this.ClienteService.guardar(Cliente).subscribe(()=>{});
                  this.BuscarPersona();
                }

              });   
          }
          //si no esta en la bd
        else
          {            
            if(this.dni.length==8)
            {
            this.buscarDniService.BuscarDni(this.dni).subscribe(
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
            this.personasService.CrearPersona(persona).subscribe();
           

            });
            this.BuscarPersona();
            }
            else
            {
              alert("DNI no encontrado, Ingrese un DNI válido");
              this.dni='';
              this.persona=[];
             // this.habilitarBotones = false; 
            }
          }
        
      })
  }
  private createPedido(idCliente: number): void {
    debugger;
    const cartItems = this.cartService.getCartItems();
  
    let pedidos:any=[];
    for (const item of cartItems) {
        pedidos=
         {
            stock:item.quantity,
            fechapedido: new Date().toISOString(),
            estado:{idestado:4}, // Asumir estado inicial pedido
            cliente:{idcliente:idCliente},
            producto:{idproducto:item.product.idproducto},
          }
          this.pedidosService.savePedido(pedidos).subscribe({
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
}