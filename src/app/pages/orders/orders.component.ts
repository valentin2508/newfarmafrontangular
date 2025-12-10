import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/cart-item';
import { PedidosService } from '../../services/pedidos.service';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private cartService: CartService,private pedidoServicce:PedidosService) {}

  ngOnInit(): void {
    this.cartService.orders$.subscribe(orders => {
      this.orders = orders;
    });

    this.pedidoServicce.List().subscribe({
    next: (response:any) => {
      console.log('Pedidos obtenidos:', response);
      this.orders = response.list; // Asumiendo que response tiene una propiedad 'list' con los pedidos
    },
    error: (error) => {
      console.error('Error al obtener los pedidos:', error);
    }
  }); 
  }
   
}