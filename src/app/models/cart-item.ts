import { Cliente } from './cliente';
import { Estado } from './estado';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  codigopedido: string;
  items: CartItem[];
  total: number;
  date: Date;
  estado?: string;
  cliente?:Cliente;
  producto?:Product;
}