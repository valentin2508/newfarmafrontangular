interface Presentacion{
    idpresentacion: number;
    nombre: string;
}
export interface PresentacionList {
    total: number;
    xpage: number;
    page: number;
    list: Presentacion[];
  }

