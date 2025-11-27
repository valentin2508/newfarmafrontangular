export interface estado{
    idestado: number;
    estado: String;
}
export interface EstadoList {
    total: number;
    xpage: number;
    page: number;
    list: estado[];
  }