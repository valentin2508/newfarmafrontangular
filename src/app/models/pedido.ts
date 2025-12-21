import { Cliente } from "./cliente";
import { Estado } from "./estado";
import { Persona } from "./persona";
import { Producto } from "./producto";

export interface Pedido{
    idpedido: number;
    codigopedido: string;
    idproducto: Producto;
    stock: number;
    fechapedido: string;
    idcliente: Cliente;
    idestado?: Estado;
    
}   
export interface PedidoList {
    total: number;
    xpage: number;
    page: number;
    list: Pedido[];
    list2:Persona;
  }