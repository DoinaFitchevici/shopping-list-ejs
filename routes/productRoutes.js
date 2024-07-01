const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API to manage your products.
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
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

router.get("/", productController.getProducts);

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created.
 *       400:
 *         description: Bad request.
 */
/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created.
 *       400:
 *         description: Bad request.
 */

router.post("/add", productController.addProduct);
router.get("/new", productController.newProductForm);

/**
 * @swagger
 * /products/edit/{id}:
 *   get:
 *     summary: Get a form to edit a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: The product edit form.
 *       404:
 *         description: The product was not found.
 */

router.get("/edit/:id", productController.editProductForm);

/**
 * @swagger
 * /products/update/{id}:
 *   post:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated.
 *       400:
 *         description: Bad request.
 */

router.post("/update/:id", productController.updateProduct);

/**
 * @swagger
 * /products/delete/{productId}:
 *   post:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: The product was successfully deleted.
 *       404:
 *         description: The product was not found.
 */

router.post("/delete/:productId", productController.deleteProduct);

module.exports = router;
