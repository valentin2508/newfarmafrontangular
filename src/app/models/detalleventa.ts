import { Producto } from "./producto";
import { Venta } from "./venta.model";

export interface DetalleVenta{
    iddetalleventa?:number,
    venta:Venta,
    producto:Producto,
    codigodetalleventa:string,
    unidades:number,
    costounidad:Float32Array,
    subtotal:Float32Array,
    descuentounidad:number,
    total:Float32Array,
}
export interface DetalleVentaList{
    total: number;
        xpage: number;
        page: number;
        list: DetalleVenta[];
}