// models/Food.js
const db = require('../dbConfig');

// Function to add a new food listing
exports.addFoodListing = (food, callback) => {
    const sql = "INSERT INTO food_listings (user_id, food_name, description, quantity, expiration_date, status) VALUES (?, ?, ?, ?, ?, 'available')";

    db.query(sql, [food.user_id, food.food_name, food.description, food.quantity, food.expiration_date], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

// Function to fetch all available food listings
exports.getAllFoodListings = (callback) => {
    const sql = "SELECT * FROM food_listings WHERE status = 'available'";

    db.query(sql, (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

// Function to claim a food item (updates the status to 'claimed')
exports.claimFood = (claim, callback) => {
    const sql = "UPDATE food_listings SET status = 'claimed' WHERE listing_id = ?";

    db.query(sql, [claim.listing_id], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};