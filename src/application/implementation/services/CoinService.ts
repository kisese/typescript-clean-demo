import {CRUDService} from "@services/CRUDService";
import {Coin} from "@entities/Coin";
import {ICoinService} from "@interfaces/services/ICoinService";
import {ICoinRepository} from "@interfaces/repositories/ICoinRepository";
import {CoinInfo} from "@dtos/CoinInfo";

export class CoinService
    extends CRUDService<Coin>
    implements ICoinService {
    constructor(protected repository: ICoinRepository) {
        super(repository);
    }

    getTotalAmount(coins: CoinInfo[]): number {
        return coins.reduce((total, coin) => total + (coin.value * coin.count), 0);
    }
}
