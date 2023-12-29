const express = require('express');
const router = express.Router();
const userController = require('../App/controllers/users-cltr');
const authController = require('../App/controllers/auth-cltr');
const adminController = require('../App/controllers/admin-cltr')
const productController = require('../App/controllers/product-cltr');
const cartController = require('../App/controllers/cart-cltr');
const { userRegisterValidationSchema, userLoginValidationSchema } = require('../App/helpers/user-Validation');
const { cartAddToCartValidationSchema, cartModifyProductInCartValidationSchema } = require('../App/helpers/cart-Validation');
const { productCreateValidationSchema, productUpdateValidationSchema } = require('../App/helpers/product-Validation');
const { checkSchema } = require('express-validator');
const { authenticateByJWT, authorizeAdmin } = require('../App/middlewares/authentication');
const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destPath = path.join(__dirname, '..', 'Uploads');
        cb(null, destPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Route for user and admin register, login
router.post('/api/auth/register', checkSchema(userRegisterValidationSchema), authController.register);
router.post('/api/auth/login', checkSchema(userLoginValidationSchema), authController.login);

// Routes for Users
router.get('/api/users', authenticateByJWT, userController.getAllUsers);
router.get('/api/users/:id', authenticateByJWT, userController.getUserById);
router.put('/api/users/:id', authenticateByJWT, userController.updateUserById);
router.delete('/api/users/:id', authenticateByJWT, userController.deleteUserById);

// Routes for Admin (here admin can get update or delete both users and admin)
router.get('/api/admin', authenticateByJWT, authorizeAdmin, adminController.getAllUsersAndAdmins);
router.get('/api/admin/:id', authenticateByJWT, authorizeAdmin, adminController.getUserOrAdminById);
router.put('/api/admin/:id', authenticateByJWT, authorizeAdmin, adminController.updateUserOrAdminById);
router.delete('/api/admin/:id', authenticateByJWT, authorizeAdmin, adminController.deleteUserOrAdminById);

// Route for Products (CRUD OPS by Admin and user)
router.post('/api/products', authenticateByJWT, upload.single('file'), checkSchema(productCreateValidationSchema), authorizeAdmin, productController.createProduct);
router.get('/api/products', productController.getAllProducts);
router.get('/api/products/:id', authenticateByJWT, productController.getProductById);
router.put('/api/products/:id', authenticateByJWT, upload.single('file'), checkSchema(productUpdateValidationSchema), authorizeAdmin, productController.updateProductById);
router.delete('/api/products/:id', authenticateByJWT, authorizeAdmin, productController.deleteProductById);

// Routes for cart
router.post('/api/cart', authenticateByJWT, checkSchema(cartAddToCartValidationSchema), cartController.addToCart);
router.put('/api/cart', authenticateByJWT, checkSchema(cartModifyProductInCartValidationSchema), cartController.modifyProductInCart);
router.get('/api/cart/:userId/:productId', authenticateByJWT, cartController.getProductFromCart);
router.get('/api/cart/:userId', authenticateByJWT, cartController.getAllProductsFromCart);
router.delete('/api/cart/:userId/:productId', authenticateByJWT, cartController.deleteProductFromCart);
router.delete('/api/cart/:userId', authenticateByJWT, cartController.deleteAllProductsFromCart);

module.exports = router;