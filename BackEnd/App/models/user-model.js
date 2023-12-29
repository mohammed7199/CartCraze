const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: String,
    username: String,
    age: Number,
    gender: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, { timestamps: true });

// Define a static method on the schema to find a user by email
userSchema.statics.findUserByEmail = async function ({ email }) {
    return this.findOne({ email });
};

const User = model('User', userSchema);

module.exports = User;