import {IsNotEmpty, IsNumber, ValidateNested} from "class-validator";
import {CoinInfo} from "@dtos/CoinInfo";
import {Type} from "class-transformer";

export class PurchaseDTO {
  constructor(props: PurchaseDTO) {
    Object.assign(this, props);
  }

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ValidateNested({ each: true })
  @Type(() => CoinInfo)
  coins: CoinInfo[];
}
