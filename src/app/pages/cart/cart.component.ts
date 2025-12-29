import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Estado } from '../../models/estado';
import { EstadoService } from '../../services/estado.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  estados: Estado[] = [];
  selectedEstado: number | null = null;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
    private estadoService: EstadoService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      console.log('Cart items updated:', this.cartItems);
      this.total = this.cartService.getTotal();
    });
    this.loadEstados();
  }

  loadEstados(): void {
    this.estadoService.List().subscribe(response => {
      this.estados = response.list;
      const pedidoEstado = this.estados.find(estado => estado.estado.toUpperCase() === 'PEDIDO');
      if (pedidoEstado) {
        this.selectedEstado = pedidoEstado.idestado;
      }
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
    debugger
    if (this.selectedEstado === null) {
      this.toastr.warning('Por favor, seleccione un estado para el pedido.');
      return;
    }
    // Navegar al formulario de cliente para registrar y luego crear el pedido
    this.router.navigate(['/client-form'], { state: { estado: this.selectedEstado } });
  }
}