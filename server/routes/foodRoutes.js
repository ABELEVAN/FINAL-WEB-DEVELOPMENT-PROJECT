// routes/foodRoutes.js
const express = require('express');
const { addFoodListing, getAllFoodListings, claimFood } = require('../models/Food');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token required. Please log in and try again.');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token. Please log in and try again.');
        req.userId = decoded.id;
        next();
    });
}

// Route to add a food listing (POST /api/food)
router.post('/', verifyToken, (req, res) => {
    const food = { ...req.body, user_id: req.userId };
    addFoodListing(food, (error, results) => {
        if (error) return res.status(500).json({ message: 'Error adding food listing.' });
        res.status(201).json({ message: 'Food listing added successfully.' });
    });
});

// Route to get all available food listings (GET /api/food)
router.get('/', (req, res) => {
    getAllFoodListings((error, results) => {
        if (error) return res.status(500).json({ message: 'Error fetching food listings.' });
        res.status(200).json(results);
    });
});

// Route to claim a food listing (POST /api/food/claim)
router.post('/claim', verifyToken, (req, res) => {
    const claim = { listing_id: req.body.listing_id };
    claimFood(claim, (error, results) => {
        if (error) return res.status(500).json({ message: 'Error claiming food.' });
        res.status(200).json({ message: 'Food claimed successfully.' });
    });
});

module.exports = router;