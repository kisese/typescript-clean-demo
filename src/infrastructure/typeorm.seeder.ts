import {Coin} from "@entities/Coin";
import {Product} from "@entities/Product";
import {AppDataSource} from "@typeorm-config";

export default async function seedDatabase() {
    const coinRepository = AppDataSource.getRepository(Coin);
    const productRepository = AppDataSource.getRepository(Product);

    // Seed Coins
    const coins = [
        {denomination: 'One', value: 1, quantity: 100},
        {denomination: 'Five', value: 5, quantity: 200},
        {denomination: 'Ten', value: 10, quantity: 300},
        {denomination: 'Twenty', value: 20, quantity: 100},
        {denomination: 'Fifty', value: 50, quantity: 100},
    ];

    for (const coinData of coins) {
        let coin = await coinRepository.findOne({where: {denomination: coinData.denomination}});
        if (!coin) {
            coin = coinRepository.create(coinData);
            await coinRepository.save(coin);
        }
    }

    // Seed Products
    const products = [
        {name: 'Bread', quantity: 50, type: 'White', price: 10},
        {name: 'Milk', quantity: 60, type: 'Fresh', price: 20},
    ];

    for (const productData of products) {
        let product = await productRepository.findOne({where: {name: productData.name}});
        if (!product) {
            product = productRepository.create(productData);
            await productRepository.save(product);
        }
    }
}

