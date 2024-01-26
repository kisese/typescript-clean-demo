import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ProductDTO {
  constructor(props: ProductDTO) {
    Object.assign(this, props);
  }
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
