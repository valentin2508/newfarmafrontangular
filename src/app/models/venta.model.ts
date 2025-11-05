export class Venta {
    idventa: number = 0;
    serie: string = '';
    correlativo: string = '';
    fechaVenta:Date = new Date();
    igv: number = 0.0;
    subTotal: number = 0.0;
    constoVenta: number = 0.0;
    idCliente: number = 0;
    idEmpleado: number = 0;
    idComprobante: number = 0;
}
export interface ventaList {
    total: number;
    xpage: number;
    page: number;
    list: Venta[];
  }