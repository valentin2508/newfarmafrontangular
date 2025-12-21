export interface TipoPersona{
    idtipopersona: number;
    nombre: string;
 
}
export interface TipoPersonaList {
    total: number;
    xpage: number;
    page: number;
    list: TipoPersona[];
  }
  