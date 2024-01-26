import {Router} from "express";
import {ProductController} from "@controllers/ProductController";
import {ProductService} from "@services/ProductService";
import {ProductRepository} from "@repositories/ProductRepository";
import {CoinRepository} from "@repositories/CoinRepository";
import {CoinService} from "@services/CoinService";
import {CoinController} from "@controllers/CoinController";
import {PurchaseController} from "@controllers/PurchaseController";
import {PurchaseRepository} from "@repositories/PurchaseRepository";

const router = Router();

const productRepository = new ProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)

router.get("/", (req, res) => {
    return res.json({
        message: "Pariti Take home Assignment"
    }).status(200);
});
/**
 * @swagger
 * /api/v1/product/:
 *   get:
 *     tags:
 *          - Products
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products from the vending machine.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/api/v1/product/", productController.getAll);
/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     tags:
 *          - Products
 *     summary: Retrieve a specific product
 *     description: Retrieve details of a specific product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Details of the product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
router.get("/api/v1/product/:id", productController.getById);
/**
 * @swagger
 * /api/v1/product/:
 *   post:
 *     tags:
 *          - Product Maintenance
 *     summary: Create a new product
 *     description: Add a new product to the inventory.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sugar"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               type:
 *                 type: string
 *                 example: "White"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 200
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input.
 */
router.post("/api/v1/product/", productController.create);
/**
 * @swagger
 * /api/v1/product/{id}:
 *   put:
 *     tags:
 *          - Product Maintenance
 *     summary: Update a product
 *     description: Update the details of an existing product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           default: 4
 *         description: The product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sugar"
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               type:
 *                 type: string
 *                 example: "White"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 200
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Product not found.
 */
router.put("/api/v1/product/:id", productController.update);
/**
 * @swagger
 * /api/v1/product/{id}:
 *   delete:
 *     tags:
 *       - Product Maintenance
 *     summary: Delete a product
 *     description: Delete a specific product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The product ID to delete.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 */
router.delete("/api/v1/product/:id", productController.delete);

const coinRepository = new CoinRepository()
const coinService = new CoinService(coinRepository)
const coinController = new CoinController(coinService)

/**
 * @swagger
 * /api/v1/coin/:
 *   get:
 *     tags:
 *       - Coins
 *     summary: Retrieve a list of coins
 *     description: Retrieve details of all available coins.
 *     responses:
 *       200:
 *         description: A list of coins.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coin'
 *       500:
 *         description: Internal server error.
 */
router.get("/api/v1/coin/", coinController.getAll);
/**
 * @swagger
 * /api/v1/coin/{id}:
 *   get:
 *     tags:
 *       - Coins
 *     summary: Retrieve a specific coin
 *     description: Retrieve details of a specific coin by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The coin ID.
 *     responses:
 *       200:
 *         description: Details of the coin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coin'
 *       404:
 *         description: Coin not found.
 */
router.get("/api/v1/coin/:id", coinController.getById);
/**
 * @swagger
 * /api/v1/coin/:
 *   post:
 *     tags:
 *       - Coin Maintenance
 *     summary: Create a new coin
 *     description: Add a new coin to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               denomination:
 *                 type: string
 *                 example: "Ninety"
 *               value:
 *                 type: number
 *                 example: 90
 *               quantity:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Coin created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coin'
 *       400:
 *         description: Invalid input.
 */
router.post("/api/v1/coin/", coinController.create);
/**
 * @swagger
 * /api/v1/coin/{id}:
 *   put:
 *     tags:
 *       - Coin Maintenance
 *     summary: Update a coin
 *     description: Update the details of an existing coin by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           default: 7
 *         description: The coin ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               denomination:
 *                 type: string
 *                 example: "Ninety"
 *               value:
 *                 type: number
 *                 example: 90
 *               quantity:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       200:
 *         description: Coin updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coin'
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Coin not found.
 */

router.put("/api/v1/coin/:id", coinController.update);
/**
 * @swagger
 * /api/v1/coin/{id}:
 *   delete:
 *     tags:
 *       - Coin Maintenance
 *     summary: Delete a coin
 *     description: Delete a specific coin by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           default: 7
 *         description: The coin ID to delete.
 *     responses:
 *       200:
 *         description: Coin deleted successfully.
 *       404:
 *         description: Coin not found.
 */
router.delete("/api/v1/coin/:id", coinController.delete);

const puchaseRepository = new PurchaseRepository()
const purchaseController = new PurchaseController(productService, productRepository, coinService, coinRepository, puchaseRepository)
/**
 * @swagger
 * /api/v1/purchase/:
 *   post:
 *     tags:
 *       - Purchases
 *     summary: Make a purchase
 *     description: Make a purchase with a given product ID and quantity, providing coins for payment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PurchaseDTO'
 *           examples:
 *             default:
 *               value:
 *                 productId: 1
 *                 quantity: 2
 *                 coins:
 *                   - denomination: "ONE"
 *                     value: 1
 *                     count: 20
 *                   - denomination: "FIVE"
 *                     value: 5
 *                     count: 2
 *     responses:
 *       200:
 *         description: Purchase successful.
 *       400:
 *         description: Invalid input.
 */
router.post("/api/v1/purchase/", purchaseController.purchase);
/**
 * @swagger
 * /api/v1/purchase/:
 *   get:
 *     tags:
 *       - Purchases
 *     summary: Retrieve a list of purchases
 *     description: Retrieve details of all purchases made.
 *     responses:
 *       200:
 *         description: A list of purchases.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 *       500:
 *         description: Internal server error.
 */
router.get("/api/v1/purchase/", purchaseController.getAll);

export {router};
