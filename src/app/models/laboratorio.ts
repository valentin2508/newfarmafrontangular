interface Laboratorio{
    idunidadmedida: number;
    nombrelaboratorio: string;
}
export interface LaboratorioList {
    total: number;
    xpage: number;
    page: number;
    list: Laboratorio[];
  }
  
