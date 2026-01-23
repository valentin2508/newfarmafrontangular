export interface Presentacion{
    idpresentacion: number;
    nombrepresentacion: string;
}
export interface PresentacionList {
    total: number;
    xpage: number;
    page: number;
    list: Presentacion[];
  }

