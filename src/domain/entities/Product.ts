import {Column, Entity} from "typeorm";
import {BaseEntity} from "@entities/BaseEntity";

@Entity('products')
export class Product extends BaseEntity {
    constructor(product?: Product) {
        super();
        Object.assign(this, product);
    }

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    type: string;

    @Column()
    price: number;

}
