import { ICRUDRepository } from "@interfaces/repositories/ICRUDRepository";
import {Product} from "@entities/Product";

export interface IProductRepository extends ICRUDRepository<Product> {
  // Add custom methods here
}
