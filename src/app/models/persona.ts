import { tipopersona } from "./tipopersona";

export interface persona{
     
    dni: number;
     ruc:number;
     nombre: String;
     materno:string;
     paterno:string;
     fechanacimiento: String;
     telefono:string;
     correo: String;
     sexo: String;
     direccion: String;
     tipoPersona: tipopersona;
}
export interface PersonaList {
    total: number;
    xpage: number;
    page: number;
    list: persona[];
  }