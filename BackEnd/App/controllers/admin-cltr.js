const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const adminController = {};

// Get All Users and Admins
adminController.getAllUsersAndAdmins = async (req, res) => {
    try {
        const usersAndAdmins = await User.find();
        res.json(usersAndAdmins);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get User or Admin by ID
adminController.getUserOrAdminById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User or Admin not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update User or Admin by ID
adminController.updateUserOrAdminById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const updatedUserOrAdmin = await User.findByIdAndUpdate(
            userId,
            { username, email },
            { new: true, runValidators: true }
        );
        if (!updatedUserOrAdmin) {
            return res.status(404).json({ message: 'User or Admin not found' });
        }
        res.json(updatedUserOrAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete User or Admin by ID
adminController.deleteUserOrAdminById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUserOrAdmin = await User.findByIdAndDelete(userId);
        if (!deletedUserOrAdmin) {
            return res.status(404).json({ message: 'User or Admin not found' });
        }
        res.json({ message: 'User or Admin deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = adminController;