
export interface empresa {
    idempresa: number;
    nombre: string;
    direccion?: string;
    paginaweb?: string;
    telefono?: string;
    correo?: string;
    info1?: string;
    info2?: string;
    info3?: string;
}
export interface EmpresaList {
    total: number;
    xpage: number;
    page: number;
    list: empresa[];
  }