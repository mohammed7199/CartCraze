const { validationResult } = require('express-validator');
const Cart = require('../models/cart-model');
const { ObjectId } = require('mongoose').Types;

const cartController = {};

// Add a product to the cart
cartController.addToCart = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, productId, quantity, name, price, image } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        // Check if the product is already in the cart
        const existingProduct = cart.products.find((product) => product.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity || 1;
        } else {
            cart.products.push({ productId, quantity, name, price, image });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Modify a product in the cart
cartController.modifyProductInCart = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const product = cart.products.find((p) => p.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }
        product.quantity = quantity || 1;
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a product from the cart
cartController.getProductFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const product = cart.products.find((p) => p.productId.toString() === productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found in the cart' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all products from the cart
cartController.getAllProductsFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId' });
        }

        const cart = await Cart.findOne({ userId: new ObjectId(userId) });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.json(cart.products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message, stack: error.stack });
    }
};


cartController.deleteProductFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.products = cart.products.filter((p) => p.productId.toString() !== productId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete all products from the cart
cartController.deleteAllProductsFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.products = [];
        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = cartController;