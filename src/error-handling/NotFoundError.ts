import { CustomError } from "@error-custom/CustomError";
import {StatusCodes} from "http-status-codes";

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
  name: string = "NotFoundError";
}
