import { cliente } from "./cliente";
import { estado } from "./estado";
import { producto } from "./producto";

export interface pedido{
    idpedido: number;
    idproducto: producto;
    stock: number;
    fechapedido: String;
    idcliente: cliente;
    idestado: estado;
    
}   
export interface PedidoList {
    total: number;
    xpage: number;
    page: number;
    list: pedido[];
  }