import {CRUDService} from "@services/CRUDService";
import {Product} from "@entities/Product";
import {IProductService} from "@interfaces/services/IProductService";
import {IProductRepository} from "@interfaces/repositories/IProductRepository";

export class ProductService
    extends CRUDService<Product>
    implements IProductService {
    constructor(protected repository: IProductRepository) {
        super(repository);
    }

}
