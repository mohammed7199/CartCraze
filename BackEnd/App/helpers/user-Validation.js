const User = require('../models/user-model');

const usernameSchema = {
    notEmpty: {
        errorMessage: 'Username is required'
    },
    isLength: {
        options: { min: 3, max: 20 },
        errorMessage: 'Username should be between 3 and 20 characters'
    },
    custom: {
        options: (value) => {
            const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
            if (!usernameRegex.test(value)) {
                throw new Error('Username should only contain letters, numbers, underscores, dots, and hyphens');
            }
            return true;
        }
    }
};

const passwordSchema = {
    notEmpty: {
        errorMessage: 'Password is required'
    },
    isStrongPassword: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        errorMessage: 'Password should be strong and meet the specified criteria'
    }
};

const emailRegisterSchema = {
    notEmpty: {
        errorMessage: 'Email is required'
    },
    isEmail: {
        errorMessage: 'Invalid email format'
    },
    custom: {
        options: async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('Email already registered');
            } else {
                return true;
            }
        }
    }
};

const emailLoginSchema = {
    notEmpty: {
        errorMessage: 'Email is required'
    },
    isEmail: {
        errorMessage: 'Invalid email format'
    }
};

const userRegisterValidationSchema = {
    username: usernameSchema,
    email: emailRegisterSchema,
    password: passwordSchema
};

const userLoginValidationSchema = {
    email: emailLoginSchema,
    password: passwordSchema
};

module.exports = {
    userRegisterValidationSchema,
    userLoginValidationSchema 
};