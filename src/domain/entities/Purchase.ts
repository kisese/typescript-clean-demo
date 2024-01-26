import { Entity, Column,  } from "typeorm";
import {BaseEntity} from "@entities/BaseEntity";
@Entity('purchases')
export class Purchase extends BaseEntity {
    constructor(purchase?: {
        quantity: number;
        productId: number;
        insertedAmount: number;
        productName: string;
        changeDetails: {
            changePossible: boolean;
            changeAmount: number;
            changeDenominations: { denomination: string; count: number }[]
        }
    }) {
        super();
        Object.assign(this, purchase);
    }

    @Column()
    productId: number;

    @Column()
    productName: string;

    @Column()
    quantity: number;

    @Column()
    insertedAmount: number;

    @Column("simple-json")
    changeDetails: {
        changePossible: boolean;
        changeAmount: number;
        changeDenominations: Array<{
            denomination: string;
            count: number;
        }>;
    };
}
