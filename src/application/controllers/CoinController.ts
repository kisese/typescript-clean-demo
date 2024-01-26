import {NextFunction, Request, Response} from "express";
import {NotFoundError} from "@error-custom//NotFoundError";
import {validate} from "class-validator";
import JSONResponse from "@helpers/JSONResponse";
import {StatusCodes} from "http-status-codes";
import {ValidationError} from "@error-custom/ValidationError";
import {ICoinService} from "@interfaces/services/ICoinService";
import {CoinDTO} from "@dtos/CoinDTO";
import {Coin} from "@entities/Coin";

export class CoinController {
    constructor(private coinService: ICoinService) {
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.coinService.GetAll();

            if (response.length === 0) {
                throw new NotFoundError("No coins found");
            }
            return JSONResponse.success(res, "Showing list of all coins", response);
        } catch (error) {
            return next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const response = await this.coinService.GetById(parseInt(id));

            if (!response) {
                throw new NotFoundError(`No coin found with id ${id}`);
            }

            return JSONResponse.success(res, `Showing coin with id ${id}`, response);
        } catch (error) {
            return next(error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const coinDTO = new CoinDTO(req.body);

            const validationError = await validate(coinDTO);

            if (validationError.length > 0) {
                return JSONResponse.error(res, new ValidationError("Create request validation error"),
                    validationError.map((error) => {
                        return {
                            [error.property]: Object.values(error.constraints),
                        };
                    }));
            }

            const response = await this.coinService.Create(new Coin(req.body));
            return JSONResponse.success(res, "Coin created successfully", response, StatusCodes.CREATED)
        } catch (error) {
            return next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const coinDTO = new CoinDTO(req.body);

            const validationError = await validate(coinDTO);

            if (validationError.length > 0) {
                return JSONResponse.error(res, new ValidationError("Update request validation error"), validationError.map((error) => {
                    return {
                        [error.property]: Object.values(error.constraints),
                    };
                }));
            }

            const response = await this.coinService.Update(
                parseInt(id),
                new Coin(req.body)
            );

            if (!response) {
                throw new NotFoundError("No data found");
            }

            return JSONResponse.success(res, "Coin updated successfully", response);
        } catch (error) {
            return next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const coinExists = await this.coinService.GetById(parseInt(id));

            if (!coinExists) {
                throw new NotFoundError(`No coin found with id ${id}`);
            }

            await this.coinService.Delete(parseInt(id));
            return JSONResponse.success(res, `Coin with id ${id} deleted successfully`);
        } catch (error) {
            return next(error);
        }
    };
}
