import { Producto } from "./producto";
import { Venta } from "./venta.model";

export interface DetalleVenta{
    iddetalleventa?:number,
    venta:Venta,
    producto:Producto,
    codigodetalleventa:string,
    unidades:number,
    costounidad:number,
    subtotal:number,
    descuentounidad:number,
    total:number,
}
export interface DetalleVentaList{
    total: number;
        xpage: number;
        page: number;
        list: DetalleVenta[];
}