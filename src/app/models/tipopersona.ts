export interface tipopersona{
    idtipopersona: number;
    nombre: string;
 
}
export interface tipopersonaList {
    total: number;
    xpage: number;
    page: number;
    list: tipopersona[];
  }
  