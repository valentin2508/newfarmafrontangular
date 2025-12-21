import { TipoPersona } from "./tipopersona";

export interface Persona{
     idpersona:number;
    dni: number;
     ruc:number;
     nombre: string;
     materno:string;
     paterno:string;
     fechanacimiento: string;
     telefono:string;
     correo: string;
     sexo: string;
     direccion: string;
     tipoPersona: TipoPersona;
}
export interface PersonaList {
    total: number;
    xpage: number;
    page: number;
    list: Persona[];
  }