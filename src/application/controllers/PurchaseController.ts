import {NextFunction, Request, Response} from "express";
import {NotFoundError} from "@error-custom//NotFoundError";
import {validate} from "class-validator";
import {ICoinService} from "@interfaces/services/ICoinService";
import {IProductService} from "@interfaces/services/IProductService";
import JSONResponse from "@helpers/JSONResponse";
import {ValidationError} from "@error-custom/ValidationError";
import {PurchaseDTO} from "@dtos/PurchaseDTO";
import {IPurchaseService} from "@interfaces/services/IPurchaseService";
import {IProductRepository} from "@interfaces/repositories/IProductRepository";
import {ICoinRepository} from "@interfaces/repositories/ICoinRepository";
import {PurchaseService} from "@services/PurchaseService";
import {IPurchaseRepository} from "@interfaces/repositories/IPurchaseRepository";

export class PurchaseController {

    private purchaseService: IPurchaseService;
    constructor(private productService: IProductService, private productRepository: IProductRepository,
                private coinService: ICoinService, private coinRepository: ICoinRepository, private purchaseRepository: IPurchaseRepository) {
        this.purchaseService = new PurchaseService(productService, productRepository, coinService, coinRepository, purchaseRepository);
    }
    purchase = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const purchaseDTO = new PurchaseDTO(req.body);

            const validationError = await validate(purchaseDTO);

            if (validationError.length > 0) {
                return JSONResponse.error(res, new ValidationError("Purchase request validation error"),
                    validationError.map((error) => {
                        return {
                            [error.property]: Object.values(error.constraints),
                        };
                    }));
            }

           return  this.purchaseService.processPurchase(req, res);
        } catch (error) {
            return next(error);
        }
    };

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.purchaseService.GetAll();

            if (response.length === 0) {
                throw new NotFoundError("No purchases avaialable");
            }
            return JSONResponse.success(res, "Showing list of all purchases", response);
        } catch (error) {
            return next(error);
        }
    };

}
