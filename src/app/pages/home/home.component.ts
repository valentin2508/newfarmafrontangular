import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { CartService } from '../../services/cart.service';
import { ProductList, Product } from '../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  currentPage = 1;
  total = 0;
  loading = false;
  quantities: { [key: number]: number } = {};
  addedProducts: Set<number> = new Set();
  @ViewChild('productsGrid', { static: false }) productsGrid!: ElementRef;

  constructor(private productoService: ProductoService, private cartService: CartService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.loading) return;
    this.loading = true;
    this.productoService.getProductos(this.currentPage).subscribe({
      next: (data: any) => {
       
        if (this.currentPage === 1) {
          this.products = data.list || [];
        } else {
          this.products = [...this.products, ...(data.list || [])];
        }
        this.total = data.total || 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  scrollLeft(): void {
    if (this.productsGrid) {
      this.productsGrid.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.productsGrid) {
      const canLoadMore = this.currentPage * 10 < this.total;
      if (canLoadMore && !this.loading) {
        this.currentPage++;
        this.loadProducts();
      }
      this.productsGrid.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }

  getProductImage(product: Product, index: number): string {
    debugger;
    const nombre = product.nombre 
    ? product.nombre.toUpperCase().split(/[\s\/]+/).filter(Boolean).join('-') 
    : '';
    if (index === 0) {
      return '/assets/img/' + nombre + '.png';
    } else if (index === 1) {
      return '/assets/img/GRAVDAN 50MG-5ML.png';
    } else if (index === 2) {
      return '/assets/img/TRAMADOL CLORHIDRATO 100MG-2ML.png';}
    else if (index === 3) {
      return '/assets/img/OXACILINA 1G.png';}
    else if (index === 4) {
      return '/assets/img/AMITRIPTILINA 25 MG.png';
    }
    return '/assets/img/default.png';
  }

  getQuantity(productId: number): number {
    if (this.addedProducts.has(productId)) {
      const item = this.cartService.getCartItems().find(item => item.product.idproducto === productId);
      return item ? item.quantity : 1;
    }
    return this.quantities[productId] || 1;
  }

  updateQuantity(productId: number, value: string): void {
    const qty = parseInt(value, 10);
    if (qty > 0) {
      if (this.addedProducts.has(productId)) {
        this.cartService.updateQuantity(productId, qty);
      } else {
        this.quantities[productId] = qty;
      }
    }
  }

  incrementQuantity(productId: number): void {
    const currentQty = this.getQuantity(productId);
    const newQty = currentQty + 1;
    if (this.addedProducts.has(productId)) {
      this.cartService.updateQuantity(productId, newQty);
    } else {
      this.quantities[productId] = newQty;
    }
  }

  decrementQuantity(productId: number): void {
    const currentQty = this.getQuantity(productId);
    if (currentQty > 1) {
      const newQty = currentQty - 1;
      if (this.addedProducts.has(productId)) {
        this.cartService.updateQuantity(productId, newQty);
      } else {
        this.quantities[productId] = newQty;
      }
    }
  }

  addToCart(product: Product): void {
    const quantity = this.getQuantity(product.idproducto);
    for (let i = 0; i < quantity; i++) {
      this.cartService.addToCart(product);
    }
    this.toastr.success(`${quantity} ${product.nombre} agregado(s) al carrito`);
    // Mark as added
    this.addedProducts.add(product.idproducto);
    // Reset quantity after adding
    this.quantities[product.idproducto] = 1;
  }
}
