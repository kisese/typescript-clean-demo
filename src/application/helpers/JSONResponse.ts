import {Response} from 'express';
import {CustomError} from "@error-custom/CustomError";
import {StatusCodes} from "http-status-codes";

class JSONResponse {
    static success(res: Response, message?: string, data?: any, statusCode: number = StatusCodes.OK) {
        res.status(statusCode).json({code: statusCode, message: message || "Success", data});
    }

    static error(res: Response, err: CustomError, data?: any) {
        res.status(err.statusCode).json({code: err.statusCode, message: err.message || "An error occurred.", data});
    }
}

export default JSONResponse;
