export interface RespuestaVenta {
    code: string;
    idVenta: number; // El nombre en Java es camelCase, pero aquí lo recibe como idVenta
    message: string;
    status: number;
}