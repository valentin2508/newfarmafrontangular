    interface Product {
        idproducto: number;
        codigoproducto: string;
        nombre: string;
        vencimiento: string;
        estado: string;
        composicion: string;
        ubicacion: string;
        stock: number;
        precioventa: number;
        precioblister: number;
        preciocaja: number;
        codbarra: string;
        laboratorio: {
          idlaboratorio: number;
          nombrelaboratorio: string;
        };
        presentacion: {
          idpresentacion: number;
          nombrepresentacion: string;
        };
        unidadMedida: {
          idunidadmedida: number;
          nombreunidad: string;
        };
      }
      
     export interface ProductList {
        total: number;
        xpage: number;
        page: number;
        list: Product[];
      }
      export interface Productos{
        prod:Product;
      }
