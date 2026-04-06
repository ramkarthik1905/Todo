const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Input configurations using express-validator
const registerValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('year').isNumeric().withMessage('Year must be a number'),
    body('Department').notEmpty().withMessage('Department is required'),
    body('Age').isNumeric().withMessage('Age must be a number')
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
];

const updateValidation = [
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('year').optional().isNumeric().withMessage('Year must be a number'),
    body('Department').optional().notEmpty().withMessage('Department is required'),
    body('Age').optional().isNumeric().withMessage('Age must be a number')
];

// Routes Configuration
router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);

// Protected routes (use authMiddleware)
router.get('/getuser', authMiddleware, userController.getUser);
router.patch('/updateuser', authMiddleware, updateValidation, userController.updateUser);

module.exports = router;
