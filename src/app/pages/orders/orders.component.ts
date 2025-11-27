import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/cart-item';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }
}