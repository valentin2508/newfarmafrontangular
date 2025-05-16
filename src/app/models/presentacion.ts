interface presentacion{
    idpresentacion: number;
    nombre: string;
}
export interface PresentacionList {
    total: number;
    xpage: number;
    page: number;
    list: presentacion[];
  }
  export interface Presentacion{
    prod:presentacion;
  }
