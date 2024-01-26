import {NextFunction, Request, Response} from "express";
import {NotFoundError} from "@error-custom//NotFoundError";
import {validate} from "class-validator";
import {Product} from "@entities/Product";
import {IProductService} from "@interfaces/services/IProductService";
import JSONResponse from "@helpers/JSONResponse";
import {ProductDTO} from "@dtos/ProductDTO";
import {StatusCodes} from "http-status-codes";
import {ValidationError} from "@error-custom/ValidationError";

export class ProductController {
    constructor(private productService: IProductService) {
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.productService.GetAll();

            if (response.length === 0) {
                throw new NotFoundError("No products found");
            }
            return JSONResponse.success(res, "Showing list of all products", response);
        } catch (error) {
            return next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const response = await this.productService.GetById(parseInt(id));

            if (!response) {
                throw new NotFoundError(`No product found with id ${id}`);
            }

            return JSONResponse.success(res, `Showing product with id ${id}`, response);
        } catch (error) {
            return next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productDTO = new ProductDTO(req.body);

            const validationError = await validate(productDTO);

            if (validationError.length > 0) {
                return JSONResponse.error(res, new ValidationError("Create request validation error"),
                    validationError.map((error) => {
                        return {
                            [error.property]: Object.values(error.constraints),
                        };
                    }));
            }

            const response = await this.productService.Create(new Product(req.body));
            return JSONResponse.success(res, "Product created successfully", response, StatusCodes.CREATED)
        } catch (error) {
            return next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const productDTO = new ProductDTO(req.body);

            const validationError = await validate(productDTO);

            if (validationError.length > 0) {
                return JSONResponse.error(res, new ValidationError("Update request validation error"), validationError.map((error) => {
                    return {
                        [error.property]: Object.values(error.constraints),
                    };
                }));
            }

            const response = await this.productService.Update(
                parseInt(id),
                new Product(req.body)
            );

            if (!response) {
                throw new NotFoundError("No data found");
            }

            return JSONResponse.success(res, "Product updated successfully", response);
        } catch (error) {
            return next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const productExists = await this.productService.GetById(parseInt(id));

            if (!productExists) {
                throw new NotFoundError(`No product found with id ${id}`);
            }

            await this.productService.Delete(parseInt(id));
            return JSONResponse.success(res, `Product with id ${id} deleted successfully`);
        } catch (error) {
            return next(error);
        }
    };

}
