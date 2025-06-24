import { Pipe,PipeTransform } from "@angular/core";
import { Product } from "../../models/product";

@Pipe({
    name:'filtro'
})
export class FiltroPipe implements PipeTransform{
    transform(Product: Product[],page:number=0):Product[] {
        console.log(Product);
        
        return Product.slice(page,page+10);
    }
}