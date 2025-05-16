import { Pipe,PipeTransform } from "@angular/core";

import { ProductList } from "../../models/product";

@Pipe({
    name:'filtro'
})
export class FiltroPipe implements PipeTransform{
    transform(ProductList: ProductList[],page:number=0):ProductList[] {
        console.log(ProductList[1].list[2].nombre);
        return ProductList.slice(page,page+5);
    }
}