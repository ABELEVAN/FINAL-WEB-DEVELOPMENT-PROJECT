// routes/userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/User');
require('dotenv').config();

const router = express.Router();

// User registration route
router.post('/register', (req, res) => {
    const user = req.body;
    
    // Check if the user already exists
    findUserByEmail(user.email, (error, existingUser) => {
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        // Create a new user if not already registered
        createUser(user, (error, results) => {
            if (error) {
                console.error('Error registering user:', error);
                return res.status(500).json({ message: 'Registration failed.' });
            }
            res.status(201).json({ message: 'User registered successfully.' });
        });
    });
});

// User login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email, (error, user) => {
        if (error || !user) return res.status(400).json({ message: 'User not found.' });

        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, user });
        } else {
            res.status(400).json({ message: 'Invalid credentials.' });
        }
    });
});

module.exports = router;