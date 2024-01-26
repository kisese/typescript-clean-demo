import { CustomError } from "@error-custom/CustomError";
import {StatusCodes} from "http-status-codes";

export class ValidationError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
  }
  name: string = "ValidationError";
}
