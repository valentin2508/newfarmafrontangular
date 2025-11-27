import { cliente } from "./cliente";
import { Empleado } from "./empleado";
import { TipoComprobante } from "./tipocomprobante";

export interface Venta {
    idventa?: number;
    serie?: string;
    correlativo?: string;
    fechaventa?:Date;
    igv?: number;
    subtotal?: number;
    costoventa?: number;
    cliente?: cliente;
    empleado?: Empleado;
    tipoComprobante?:TipoComprobante;
}
export interface ventaList {
    total: number;
    xpage: number;
    page: number;
    list: Venta[];
  }