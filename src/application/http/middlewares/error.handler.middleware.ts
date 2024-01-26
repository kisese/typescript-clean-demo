import {NextFunction, Request, Response} from "express";
import {CustomError} from "@error-custom//CustomError";
import {NotFoundError} from "@error-custom//NotFoundError";
import {BadRequestError} from "@error-custom//BadRequestError";
import JSONResponse from "@helpers/JSONResponse";
import {StatusCodes} from "http-status-codes";
import {ValidationError} from "@error-custom/ValidationError";

export const ErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return JSONResponse.error(res, err);
    }

    if (err instanceof NotFoundError) {
        return JSONResponse.error(res, err);
    }

    if (err instanceof BadRequestError) {
        return JSONResponse.error(res, err);
    }

    if (err instanceof ValidationError) {
        return JSONResponse.error(res, err);
    }

    return JSONResponse.error(res, new CustomError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR));
};
