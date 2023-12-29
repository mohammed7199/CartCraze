const cartValidationSchema = {
    userId: {
        notEmpty: {
            errorMessage: 'User ID is required'
        }
    },
    productId: {
        notEmpty: {
            errorMessage: 'Product ID is required'
        }
    },
    name: {
        notEmpty: {
            errorMessage: 'Product Name is required'
        }
    },
    price: {
        isNumeric: {
            errorMessage: 'Price must be a number'
        },
    },
    image: {
        notEmpty: {
            errorMessage: 'File Name is required'
        }
    },
    quantity: {
        isNumeric: {
            errorMessage: 'Quantity must be a number'
        },
        custom: {
            options: (value) => {
                if (value < 1) {
                    throw new Error('Quantity must be at least 1');
                }
                return true;
            }
        }
    }
};

const cartAddToCartValidationSchema = {
    userId: cartValidationSchema.userId,
    productId: cartValidationSchema.productId,
    name: cartValidationSchema.name,
    price: cartValidationSchema.price,
    image: cartValidationSchema.image,
    quantity: cartValidationSchema.quantity
};

const cartModifyProductInCartValidationSchema = {
    userId: cartValidationSchema.userId,
    productId: cartValidationSchema.productId,
    quantity: cartValidationSchema.quantity
};

module.exports = {
    cartAddToCartValidationSchema,
    cartModifyProductInCartValidationSchema
};
