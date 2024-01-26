import {ICRUDRepository} from "@interfaces/repositories/ICRUDRepository";
import {Coin} from "@entities/Coin";

export interface ICoinRepository extends ICRUDRepository<Coin> {
    // Add custom methods here
    GetAllByValue(): Promise<Coin[]>;
}
