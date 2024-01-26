import { CRUDRepository } from "@repositories/CRUDRepository";
import {Coin} from "@entities/Coin";
import {ICoinRepository} from "@interfaces/repositories/ICoinRepository";

export class CoinRepository
  extends CRUDRepository<Coin>
  implements ICoinRepository
{
  constructor() {
    const Entity = Coin;
    super(Entity);
  }

  async GetAllByValue(): Promise<Coin[]> {
    const entities = await this.repository.find({
      order: {
        value: "DESC"
      }
    });
    return entities;
  }
}
