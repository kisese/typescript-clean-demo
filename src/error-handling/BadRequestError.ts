import { CustomError } from "@error-custom/CustomError";
import {StatusCodes} from "http-status-codes";

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
  name: string = "BadRequestError";
}
