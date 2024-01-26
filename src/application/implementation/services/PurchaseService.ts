import {Product} from "@entities/Product";
import {IProductService} from "@interfaces/services/IProductService";
import {IProductRepository} from "@interfaces/repositories/IProductRepository";
import {IPurchaseService} from "@interfaces/services/IPurchaseService";
import {ICoinRepository} from "@interfaces/repositories/ICoinRepository";
import {ICoinService} from "@interfaces/services/ICoinService";
import JSONResponse from "@helpers/JSONResponse";
import {CustomError} from "@error-custom/CustomError";
import {StatusCodes} from "http-status-codes";
import {Request, Response} from "express";
import {Purchase} from "@entities/Purchase";
import {PurchaseTransactionDTO} from "@dtos/PurchaseTransactionDTO";
import {IPurchaseRepository} from "@interfaces/repositories/IPurchaseRepository";
import {CRUDService} from "@services/CRUDService";

export class PurchaseService
    extends CRUDService<Purchase>
    implements IPurchaseService{

    constructor(private productService: IProductService, private productRepository: IProductRepository,
                private coinService: ICoinService, private coinRepository: ICoinRepository, private purchaseRepository: IPurchaseRepository) {
        super(purchaseRepository);
    }

    async processPurchase(req: Request, res: Response) {
        const productId: number = Number(req.body.productId);
        const quantity: number = Number(req.body.quantity);
        const insertedAmount: number = this.coinService.getTotalAmount(req.body.coins);
        const product: Product | undefined = await this.productService.GetById(productId);

        if (!product) {
            return JSONResponse.error(res,
                new CustomError(`Sorry product ${productId} does not exist. Enter the correct product details.`,
                    StatusCodes.BAD_REQUEST));
        }

        if (product.quantity < 1 || product.quantity < quantity) {
            return JSONResponse.error(res,
                new CustomError(`Sorry, we are out of stock for this item, please collect money: ${insertedAmount}.`,
                    StatusCodes.BAD_REQUEST));
        }

        const change: number = insertedAmount - product.price;

        if (change < 0) {
            return JSONResponse.error(res,
                new CustomError(`Sorry, you have insufficient funds, returning R: ${insertedAmount}.`,
                    StatusCodes.BAD_REQUEST));
        }

        const changeDetails = await this.getChangeDetails(change);

        if (!changeDetails.changePossible) {
            return JSONResponse.error(res,
                new CustomError(`Sorry, we are unable to give change for this item, please collect money: ${insertedAmount}.`,
                    StatusCodes.BAD_REQUEST));
        }

        product.quantity -= quantity;
        await this.productService.Update(product.id, product);

        const response: PurchaseTransactionDTO = {
            productId: product.id,
            productName: product.name,
            quantity,
            insertedAmount,
            changeDetails
        }


        await this.Create(new Purchase({
            productId: product.id,
            productName: product.name,
            quantity,
            insertedAmount,
            changeDetails: {
                changePossible: changeDetails.changePossible,
                changeAmount: changeDetails.changeAmount,
                changeDenominations: changeDetails.changeDenominations
            }
        }));

        return JSONResponse.success(res, "Purchase created successfully", response, StatusCodes.CREATED)
    }

    async getChangeDetails(amount: number): Promise<{
        changePossible: boolean,
        changeAmount: number,
        changeDenominations: { denomination: string, count: number }[]
    }> {
        const coins = await this.coinRepository.GetAllByValue();

        let remainingAmount = amount;
        let changeDenominations = [];

        for (const coin of coins) {
            if (remainingAmount === 0) break;

            const count = Math.min(Math.floor(remainingAmount / coin.value), coin.quantity);
            if (count > 0) {
                changeDenominations.push({denomination: coin.denomination, count});
                remainingAmount -= count * coin.value;
            }
        }

        return {
            changePossible: remainingAmount === 0,
            changeAmount: amount - remainingAmount,
            changeDenominations
        };
    }
}
