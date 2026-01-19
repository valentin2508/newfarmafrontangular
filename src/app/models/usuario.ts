import { cargo } from "./cargo";


export interface usuario {
    idusuario: number;
    nombreusuario: string;
    clave?: string;
    fechacreacion?: Date;
    cargo?:cargo
}
export interface EmpleadoList {
    total: number;
    xpage: number;
    page: number;
    list: usuario[];
  }