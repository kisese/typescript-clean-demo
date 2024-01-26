import {Coin} from "@entities/Coin";

import {ICoinService} from '@interfaces/services/ICoinService';
import {CoinInfo} from "@dtos/CoinInfo";
import {CoinService} from "@services/CoinService";
import {mock, MockProxy} from "jest-mock-extended";
import {ICoinRepository} from "@interfaces/repositories/ICoinRepository";

describe('CoinService', () => {
    let coinRepository: MockProxy<ICoinRepository>;
    let coinService: ICoinService;
    beforeEach(() => {
        coinRepository = mock<ICoinRepository>();
        coinService = new CoinService(coinRepository);
    });

    it('should calculate the total amount correctly', () => {
        const coins: CoinInfo[] = [
            {denomination: "Fifty", value: 50, count: 2},
            {denomination: "Twenty", value: 20, count: 3},
            {denomination: "Ten", value: 10, count: 1}
        ];

        const totalAmount = coinService.getTotalAmount(coins);
        expect(totalAmount).toBe(170); // 2*50 + 3*20 + 1*10
    });

    it('should return 0 if no coins are provided', () => {
        const coins: CoinInfo[] = [];
        const totalAmount = coinService.getTotalAmount(coins);
        expect(totalAmount).toBe(0);
    });
});


const mockCoins: Coin[] = [{
    "id": 7,
    "createdAt": new Date("2024-01-23T19:43:55.000Z"),
    "updatedAt": new Date("2024-01-23T19:50:38.000Z"),
    "denomination": "Ninenty",
    "value": 90,
    "quantity": 50
}, {
    "id": 13,
    "createdAt": new Date("2024-01-24T19:53:09.000Z"),
    "updatedAt": new Date("2024-01-24T19:53:09.000Z"),
    "denomination": "Ninenty",
    "value": 90,
    "quantity": 50
}, {
    "id": 5,
    "createdAt": new Date("2024-01-23T19:40:59.000Z"),
    "updatedAt": new Date("2024-01-23T19:40:59.000Z"),
    "denomination": "Fifty",
    "value": 50,
    "quantity": 100
}, {
    "id": 12,
    "createdAt": new Date("2024-01-23T19:50:36.000Z"),
    "updatedAt": new Date("2024-01-23T19:50:36.000Z"),
    "denomination": "Fifty",
    "value": 50,
    "quantity": 100
}, {
    "id": 4,
    "createdAt": new Date("2024-01-23T19:40:59.000Z"),
    "updatedAt": new Date("2024-01-23T19:40:59.000Z"),
    "denomination": "Twenty",
    "value": 20,
    "quantity": 100
}, {
    "id": 11,
    "createdAt": new Date("2024-01-23T19:50:36.000Z"),
    "updatedAt": new Date("2024-01-23T19:50:36.000Z"),
    "denomination": "Twenty",
    "value": 20,
    "quantity": 100
}, {
    "id": 3,
    "createdAt": new Date("2024-01-23T19:40:59.000Z"),
    "updatedAt": new Date("2024-01-23T19:40:59.000Z"),
    "denomination": "Ten",
    "value": 10,
    "quantity": 300
}, {
    "id": 10,
    "createdAt": new Date("2024-01-23T19:50:36.000Z"),
    "updatedAt": new Date("2024-01-23T19:50:36.000Z"),
    "denomination": "Ten",
    "value": 10,
    "quantity": 300
}, {
    "id": 2,
    "createdAt": new Date("2024-01-23T19:40:59.000Z"),
    "updatedAt": new Date("2024-01-23T19:40:59.000Z"),
    "denomination": "Five",
    "value": 5,
    "quantity": 200
}, {
    "id": 9,
    "createdAt": new Date("2024-01-23T19:50:36.000Z"),
    "updatedAt": new Date("2024-01-23T19:50:36.000Z"),
    "denomination": "Five",
    "value": 5,
    "quantity": 200
}, {
    "id": 1,
    "createdAt": new Date("2024-01-23T19:40:59.000Z"),
    "updatedAt": new Date("2024-01-23T19:40:59.000Z"),
    "denomination": "Cent",
    "value": 1,
    "quantity": 100
}, {
    "id": 6,
    "createdAt": new Date("2024-01-23T19:42:33.000Z"),
    "updatedAt": new Date("2024-01-23T19:42:33.000Z"),
    "denomination": "One",
    "value": 1,
    "quantity": 100
}, {
    "id": 8,
    "createdAt": new Date("2024-01-23T19:50:36.000Z"),
    "updatedAt": new Date("2024-01-23T19:50:36.000Z"),
    "denomination": "One",
    "value": 1,
    "quantity": 100
}]

export {mockCoins}