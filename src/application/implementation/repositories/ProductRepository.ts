import { CRUDRepository } from "@repositories/CRUDRepository";
import {Product} from "@entities/Product";
import {IProductRepository} from "@interfaces/repositories/IProductRepository";

export class ProductRepository
  extends CRUDRepository<Product>
  implements IProductRepository
{
  constructor() {
    const Entity = Product;
    super(Entity);
  }
}
