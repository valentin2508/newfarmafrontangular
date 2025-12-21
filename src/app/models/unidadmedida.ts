interface UnidadMedida{
    idunidadmedida: number;
    nombreunidadmedida: string;
}
export interface UnidadMedidaList {
    total: number;
    xpage: number;
    page: number;
    list: UnidadMedida[];
  }
 