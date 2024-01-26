import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CoinDTO {
  constructor(props: CoinDTO) {
    Object.assign(this, props);
  }

  @IsNotEmpty()
  @IsString()
  denomination: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
