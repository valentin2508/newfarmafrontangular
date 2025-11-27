import { producto } from "./producto";
import { Venta } from "./venta.model";

export interface detalleventa{
    iddetalleventa?:number,
    venta:Venta,
    producto:producto,
    codigodetalleventa:string,
    unidades:number,
    costounidad:Float32Array,
    subtotal:Float32Array,
    descuentounidad:number,
    total:Float32Array,
}
export interface detalleventaList{
    total: number;
        xpage: number;
        page: number;
        list: detalleventa[];
}