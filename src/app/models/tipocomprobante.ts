export interface TipoComprobante {
    idtipocomprobante: number;
    nombrecomprobante?: string;
}
export interface TipoComprobanteList {
    total: number;
    xpage: number;
    page: number;
    list: TipoComprobante[];
  }