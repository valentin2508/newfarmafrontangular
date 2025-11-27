import { estado } from "./estado";
import { persona } from "./persona";

export interface Empleado {
    idempleado: number;
    estado_estado?: estado;
    persona?: persona;
    usuario?: string;
}
export interface EmpleadoList {
    total: number;
    xpage: number;
    page: number;
    list: Empleado[];
  }