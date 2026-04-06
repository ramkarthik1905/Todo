const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

const handleValidationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return true;
    }
    return false;
};

const register = async (req, res) => {
    if (handleValidationErrors(req, res)) return;

    try {
        const { username, password, year, Department, email, Age } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();

        const newUser = await User.create({
            userId,
            username,
            password: hashedPassword,
            year,
            Department,
            email,
            Age
        });

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server validation error' });
    }
};

const login = async (req, res) => {
    if (handleValidationErrors(req, res)) return;

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { userId: user.userId },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.user.userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const updateUser = async (req, res) => {
    if (handleValidationErrors(req, res)) return;

    try {
        const updateData = { ...req.body };
        
        // Ensure sensitive info cannot be updated through this simple route
        delete updateData.password;
        delete updateData.userId;
        delete updateData.email; // Usually emails shouldn't be updated loosely.

        const updatedUser = await User.findOneAndUpdate(
            { userId: req.user.userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    getUser,
    updateUser
};
