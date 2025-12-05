import { persona } from "./persona";

export interface cliente{
    
    idcliente: number;
    idpersona?: persona;
}
export interface ClienteList {
    total: number;
    xpage: number;
    page: number;
    list: cliente[];
  }