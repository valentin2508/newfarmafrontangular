import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/cart-item';
import { PedidosService } from '../../services/pedidos.service';
import { Pedido, PedidoList } from '../../models/pedido';
import { EstadoService } from '../../services/estado.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  agrupados: any={};
  estado:any[]=[];
  constructor(
    private cartService: CartService,
    private pedidoServicce:PedidosService,
    private estadoservice:EstadoService
  ) 
    
    {}

  ngOnInit(): void {
    debugger;
      this.estadoservice.List().subscribe(result=>{
        this.estado=result.list.filter(e => ['PEDIDO', 'ATENDIDO', 'CANCELADO'].includes(e.estado));
        this.estado.sort((a, b) => {
          if (a.estado === 'PEDIDO') return -1;
          if (b.estado === 'PEDIDO') return 1;
          return 0;
        });

      })


     this.pedidoServicce.List().subscribe(
       {
         next: (response:any) =>
           {
             this.orders = response.list;

              this.agrupados = Object.values(this.orders.reduce((acc, current) =>
               {
                 if (!acc[current.codigopedido])
                   {
                     acc[current.codigopedido] = { codigopedido: current.codigopedido, items: [] };
                   }
                     acc[current.codigopedido].items.push(current);
                     return acc;
               }, {})).sort((a: any, b: any) => new Date(b.items[0].fechapedido).getTime() - new Date(a.items[0].fechapedido).getTime());

           },
           error: (error) =>
             {
               console.error('Error al obtener los pedidos:', error);
             }
       });
    }

   cambiarEstado(group: any, estado: any) {
     group.items.forEach((item: any) => item.estado = estado);
   }

 }