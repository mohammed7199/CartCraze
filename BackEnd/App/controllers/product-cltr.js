const { validationResult } = require('express-validator');
const Product = require('../models/product-model');

const productController = {};


// Create a new product
productController.createProduct = async (req, res) => {
    try {
        const { name, description, price, categories } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => ({
                type: 'field',
                msg: error.msg,
                path: error.param,
                location: 'body',
            }));
            return res.status(400).json({ errors: errorMessages });
        }

        const image = req.file ? req.file.filename : '';

        const newProduct = new Product({ name, description, price, image, categories });
        await newProduct.save();

        res.json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Get all products
productController.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get product by ID
productController.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update product by ID
productController.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, categories } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => ({
                type: 'field',
                msg: error.msg,
                path: error.param,
                location: 'body',
            }));
            return res.status(400).json({ errors: errorMessages });
        }

        const image = req.file ? req.file.filename : '';

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, image, categories },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete product by ID
productController.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully', productId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = productController;