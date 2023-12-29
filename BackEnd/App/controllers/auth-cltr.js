const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const authController = {};

// Register
authController.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;

    try {
        const user = new User(body);
        const salt = await bcryptjs.genSalt();
        user.password = await bcryptjs.hash(user.password, salt);
        // If the role is not provided in the request, default to 'user'
        user.role = user.role || 'user';
        // assign first user in the app as admin
        const totalUsers = await User.countDocuments();
        if (totalUsers === 0) {
            user.role = 'admin';
        }
        await user.save();
        res.json(user);
    } catch (e) {
        res.json(e);
    }
};

//Login
authController.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid credentials' });
        }

        // Check role
        if (role !== user.role) {
            return res.status(403).json({ msg: 'Access denied' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1hr' }
        );

        const { ...others } = user._doc

        res.json({ ...others, token });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = authController;