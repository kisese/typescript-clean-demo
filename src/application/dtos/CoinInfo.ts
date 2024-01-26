import { IsNotEmpty, IsNumber } from "class-validator";

export class CoinInfo {
    @IsNotEmpty()
    @IsNumber()
    denomination: string;

    @IsNotEmpty()
    @IsNumber()
    value: number;

    @IsNotEmpty()
    @IsNumber()
    count: number;

    constructor(denomination: string, count: number, value: number) {
        this.denomination = denomination;
        this.count = count;
        this.value = value;
    }
}
