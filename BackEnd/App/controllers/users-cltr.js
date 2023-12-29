const { validationResult } = require('express-validator');
const User = require('../models/user-model');

const userController = {};

// Get All Users (excluding admin)
userController.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get User by ID (excluding admin)
userController.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId, role: 'user' });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update User by ID (excluding admin)
userController.updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId, role: 'user' },
            { username, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete User by ID (excluding admin)
userController.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findOneAndDelete({ _id: userId, role: 'user' });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = userController;