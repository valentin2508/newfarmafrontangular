import { Proveedor } from "./proveedor";
import { Empleado } from "./empleado";
import { TipoComprobante } from "./tipocomprobante";

export interface Compra {
    idcompra?: number;
    serie?: string;
    correlativo?: string;
    proveedor?: Proveedor;
    comprobante?: TipoComprobante;
    empleado?: Empleado;
    fechaCompra?: Date;
    costoCompra?: number;
    
}

export interface CompraList {
    total: number;
    xpage: number;
    page: number;
    list: Compra[];
}