import { Persona } from "./persona";

export interface Proveedor {
    idproveedor: number;
    persona?: Persona;
}

export interface ProveedorList {
    total: number;
    xpage: number;
    page: number;
    list: Proveedor[];
}
