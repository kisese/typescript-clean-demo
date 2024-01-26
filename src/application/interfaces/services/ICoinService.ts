import { ICRUDService } from "@interfaces/services/ICRUDService";
import {Coin} from "@entities/Coin";
import {CoinInfo} from "@dtos/CoinInfo";

export interface ICoinService extends ICRUDService<Coin> {
  // Add custom methods here
    getTotalAmount(coins: CoinInfo[]): number;
}
