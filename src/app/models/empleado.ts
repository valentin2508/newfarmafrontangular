import { Estado } from "./estado";
import { Persona } from "./persona";

export interface Empleado {
    idempleado: number;
    estado_estado?: Estado;
    persona?: Persona;
    usuario?: string;
}
export interface EmpleadoList {
    total: number;
    xpage: number;
    page: number;
    list: Empleado[];
  }