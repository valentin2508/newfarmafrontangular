import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Order } from '../models/cart-item';
import { Product } from '../models/product';
import { VentasService } from './ventas.service';
import { Venta } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private orderIdCounter = 1;

  cart$ = this.cartSubject.asObservable();
  orders$ = this.ordersSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private ventasService: VentasService) {
    // Load from localStorage if available
    if (isPlatformBrowser(this.platformId)) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.cartSubject.next(this.cartItems);
      }
    }
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.idproducto === product.idproducto);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.subtotal = existingItem.quantity * product.precioventa;
    } else {
      const newItem: CartItem = {
        product,
        quantity,
        subtotal: quantity * product.precioventa
      };
      this.cartItems.push(newItem);
    }
    this.saveCart();
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.idproducto !== productId);
    this.saveCart();
    this.cartSubject.next(this.cartItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.idproducto === productId);
    if (item) {
      item.quantity = quantity;
      item.subtotal = quantity * item.product.precioventa;
      this.saveCart();
      this.cartSubject.next(this.cartItems);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.subtotal, 0);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
    this.cartSubject.next(this.cartItems);
  }

  checkout(): Order {
    const order: Order = {
      id: this.orderIdCounter++,
      items: [...this.cartItems],
      total: this.getTotal(),
      date: new Date(),
      status: 'pending'
    };
    this.orders.push(order);
    this.ordersSubject.next(this.orders);
    this.clearCart();
    return order;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  private saveCart(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }
}