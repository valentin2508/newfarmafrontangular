import { Estado } from "./estado";

export interface cargo {
    idcargo: number;
    nombrecargo: string;
    descripcion?: string;
    estado?:Estado
}
export interface CargoList {
    total: number;
    xpage: number;
    page: number;
    list: cargo[];
  }