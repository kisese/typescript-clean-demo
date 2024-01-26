import { IsNotEmpty, IsNumber, IsString, ValidateNested, IsBoolean } from "class-validator";
import { Type } from "class-transformer";

class ChangeDenomination {
  @IsNotEmpty()
  @IsString()
  denomination: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}

class ChangeDetails {
  @IsNotEmpty()
  @IsBoolean()
  changePossible: boolean;

  @IsNotEmpty()
  @IsNumber()
  changeAmount: number;

  @ValidateNested({ each: true })
  @Type(() => ChangeDenomination)
  changeDenominations: ChangeDenomination[];
}

export class PurchaseTransactionDTO {
  constructor(props: PurchaseTransactionDTO) {
    Object.assign(this, props);
  }

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  insertedAmount: number;

  @ValidateNested()
  @Type(() => ChangeDetails)
  changeDetails: ChangeDetails;
}
