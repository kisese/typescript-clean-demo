import {Column, Entity} from "typeorm";
import {BaseEntity} from "@entities/BaseEntity";

@Entity('coins')
export class Coin extends BaseEntity {
    constructor(coin?: Coin) {
        super();
        Object.assign(this, coin);
    }

    @Column()
    denomination: string;

    @Column()
    value: number;

    @Column()
    quantity: number;
}
