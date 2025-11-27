import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  updateQuantity(productId: number, quantityStr: string): void {
    const quantity = parseInt(quantityStr, 10);
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      this.removeItem(productId);
    }
  }

  incrementQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.product.idproducto === productId);
    if (item) {
      this.updateQuantity(productId, (item.quantity + 1).toString());
    }
  }

  decrementQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.product.idproducto === productId);
    if (item && item.quantity > 1) {
      this.updateQuantity(productId, (item.quantity - 1).toString());
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  checkout(): void {
    // Navegar al formulario de cliente para registrar y luego crear el pedido
    this.router.navigate(['/client-form']);
  }


}