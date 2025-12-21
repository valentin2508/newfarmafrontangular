export interface Estado{
    idestado: number;
    estado: string;
}
export interface EstadoList {
    total: number;
    xpage: number;
    page: number;
    list: Estado[];
  }