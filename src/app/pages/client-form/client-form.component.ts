import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../../services/personas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import { PedidosService } from '../../services/pedidos.service';
import { BuscarDniService } from '../../services/buscar-dni.service';
import { Pedido } from '../../models/pedido';
import { Persona } from '../../models/persona';
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
  persona:Persona[]=[];
  personaTemporal:any[]=[];
  countPedidos:number=0;
public data: any

  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService,
    private clienteService:ClienteService,
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
  ngOnInit(): void {
    this.CountPedidos();
  }

  onSubmit(): void {
    debugger
    if (this.clientForm.valid) 
      {
        debugger
        this.modificarPersona();
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
        
          //si esta en la bd
        if(response.list.length>0 )
          {
            debugger;
              this.persona =response.list;  
              //this.habilitarBotones = true;      
             
              this.clienteService.listarByIdPersona(this.persona[0].idpersona).subscribe(responseCliente=>{
               
                //si es un cliente muestra los datos en el form
                if(responseCliente.list.length>0)
                {
                  this.idcliente=responseCliente.list[0].idcliente
                  this.clientForm.patchValue
                  ({
                    idpersona: this.persona[0].idpersona,
                    nombre: this.persona[0].nombre,
                    paterno: this.persona[0].paterno,
                    materno: this.persona[0].materno,
                    //moment(response.list[0].vencimiento, 'DD-MM-YYYY').format('YYYY-MM-DD'),
                    //fechanacimiento: this.persona[0].fechanacimiento,
                    telefono: this.persona[0].telefono,
                    correo: this.persona[0].correo,
                    sexo: this.persona[0].sexo,
                    direccion: this.persona[0].direccion
                  });
                }
                else{
                  debugger;
                  const Cliente={
                    persona:{
                      idpersona: this.persona[0].idpersona
                    }
                  }
                  this.clienteService.guardar(Cliente).subscribe(()=>{
                    this.BuscarPersona();
                  });
                }

              });   
          }
          //si no esta en la bd
        else
          { 
            debugger;           
            if(dni.length==8)
            {
              debugger;
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
                    telefono: this.data['telefono'],//"000000000",
                    correo:this.data['nombres'].split(' ').join('_')+"@gmail.com",
                    sexo: "",
                    direccion: "Anonimo",
                    tipoPersona:{idtipopersona:1} 
                  };          
                  debugger;  
                this.personasService.CrearPersona(persona).subscribe(() => {
                this.BuscarPersona();
            });
           

            });
            
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
  modificarPersona() {
    debugger;
    const updatedPersona = {
      idpersona: this.persona[0].idpersona,
      dni: this.clientForm.get('dni')?.value,
      ruc: this.clientForm.get('ruc')?.value,
      nombre: this.clientForm.get('nombre')?.value,
      materno: this.clientForm.get('materno')?.value,
      paterno: this.clientForm.get('paterno')?.value,
      fechanacimiento: this.clientForm.get('fechanacimiento')?.value,
      telefono: this.clientForm.get('telefono')?.value,
      correo: this.clientForm.get('correo')?.value,
      sexo: this.clientForm.get('sexo')?.value,
      direccion: this.clientForm.get('direccion')?.value,
      tipoPersona:{idtipopersona:1} 
    };
    this.personasService.CrearPersona(updatedPersona).subscribe(() => {
      //this.toastr.success('Persona actualizada con éxito');
     // this.BuscarPersona();
    });
  }
  CountPedidos():void{
  this.pedidosService.List().subscribe(response=>{
    debugger;
    console.log(response);
      this.countPedidos= Number(response.total+1);
    });
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
            codigopedido: 'PED-' + this.countPedidos,
          }
          debugger;
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