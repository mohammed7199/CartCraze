const productValidationSchema = {
    name: {
        notEmpty: {
            errorMessage: 'Name is required'
        }
    },
    description: {
        notEmpty: {
            errorMessage: 'Description is required'
        }
    },
    price: {
        isNumeric: {
            errorMessage: 'Price must be a number'
        }
    },
};

const productCreateValidationSchema = {
    name: productValidationSchema.name,
    description: productValidationSchema.description,
    price: productValidationSchema.price,
};

const productUpdateValidationSchema = {
    name: productValidationSchema.name,
    description: productValidationSchema.description,
    price: productValidationSchema.price
};

module.exports = {
    productCreateValidationSchema,
    productUpdateValidationSchema
};