import { CRUDRepository } from "@repositories/CRUDRepository";
import {IPurchaseRepository} from "@interfaces/repositories/IPurchaseRepository";
import {Purchase} from "@entities/Purchase";

export class PurchaseRepository
  extends CRUDRepository<Purchase>
  implements IPurchaseRepository
{
  constructor() {
    const Entity = Purchase;
    super(Entity);
  }
}
