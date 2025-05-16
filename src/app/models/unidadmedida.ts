interface unidadMedida{
    idunidadmedida: number;
    nombreunidadmedida: string;
}
export interface UnidadMedidaList {
    total: number;
    xpage: number;
    page: number;
    list: unidadMedida[];
  }
  export interface UnidadMedida{
    prod:unidadMedida;
  }
