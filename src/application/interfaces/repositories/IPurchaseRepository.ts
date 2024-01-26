import { ICRUDRepository } from "@interfaces/repositories/ICRUDRepository";
import {Purchase} from "@entities/Purchase";

export interface IPurchaseRepository extends ICRUDRepository<Purchase> {
  // Add custom methods here
}
