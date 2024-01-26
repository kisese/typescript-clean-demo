import {mock, MockProxy} from 'jest-mock-extended';

import {PurchaseService} from "@services/PurchaseService";
import {IProductService} from "@interfaces/services/IProductService";
import {ICoinService} from "@interfaces/services/ICoinService";
import {IPurchaseRepository} from "@interfaces/repositories/IPurchaseRepository";
import {IProductRepository} from "@interfaces/repositories/IProductRepository";
import {ICoinRepository} from "@interfaces/repositories/ICoinRepository";
import {Product} from "@entities/Product";
import {mockCoins} from "./CoinService.test";

describe('PurchaseService', () => {
    let productService: MockProxy<IProductService>;
    let productRepository: MockProxy<IProductRepository>;
    let coinService: MockProxy<ICoinService>;
    let coinRepository: MockProxy<ICoinRepository>;
    let purchaseRepository: MockProxy<IPurchaseRepository>;
    let purchaseService: PurchaseService;



    beforeEach(() => {
        productService = mock<IProductService>();
        productRepository = mock<IProductRepository>();
        coinService = mock<ICoinService>();
        coinRepository = mock<ICoinRepository>();
        purchaseRepository = mock<IPurchaseRepository>();

        coinRepository.GetAllByValue.mockResolvedValue(mockCoins);

        purchaseService = new PurchaseService(productService, productRepository, coinService, coinRepository, purchaseRepository);

    });

    it('should process a successful purchase', async () => {
        const product = new Product();
        product.id = 1;
        product.name = "Bread";
        product.price = 10;
        product.quantity = 5;

        productService.GetById.mockResolvedValue(product);
        coinService.getTotalAmount.mockReturnValue(30);

        const req: any = {
            body: {
                productId: 1,
                quantity: 2,
                coins: [
                    {denomination: "ONE", value: 1, count: 20},
                    {denomination: "FIVE", value: 5, count: 2}
                ]
            }
        };
        const res: any = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        await purchaseService.processPurchase(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 201,
            message: "Purchase created successfully",
            data: expect.objectContaining({
                productId: 1,
                productName: "Bread",
                quantity: 2,
                insertedAmount: 30,
                changeDetails: expect.objectContaining({
                    changePossible: true,
                    changeAmount: 20,
                    changeDenominations: expect.arrayContaining([
                        expect.objectContaining({
                            denomination: "Twenty",
                            count: 1
                        })
                    ])
                })
            })
        }));
    });

    it('should calculate correct change when exact change is possible', async () => {
        const amount = 70;
        const expectedChange = {
            changePossible: true,
            changeAmount: 70,
            changeDenominations: [
                { denomination: "Fifty", count: 1 },
                { denomination: "Twenty", count: 1 }
            ]
        };

        const changeDetails = await purchaseService.getChangeDetails(amount);

        expect(changeDetails).toEqual(expectedChange);
    });

});
