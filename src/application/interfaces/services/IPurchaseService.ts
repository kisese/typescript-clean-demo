import {ICRUDService} from "@interfaces/services/ICRUDService";
import {Request, Response} from "express";
import JSONResponse from "@helpers/JSONResponse";
import {Purchase} from "@entities/Purchase";

export interface IPurchaseService  extends ICRUDService<Purchase>{
    // Add custom methods here
    processPurchase(req: Request, res: Response): JSONResponse;

    getChangeDetails(amount: number): Promise<{
        changePossible: boolean,
        changeAmount: number,
        changeDenominations: { denomination: string, count: number }[]
    }>;
}
