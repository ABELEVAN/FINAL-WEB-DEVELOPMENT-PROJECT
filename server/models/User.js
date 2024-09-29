// models/User.js
const db = require('../dbConfig');
const bcrypt = require('bcryptjs');

// Function to create a new user
exports.createUser = (user, callback) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10); // Encrypt the password
    const sql = "INSERT INTO users (name, email, password, user_type, address, phone) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [user.name, user.email, hashedPassword, user.user_type, user.address, user.phone], (error, results) => {
        if (error) return callback(error);
        callback(null, results);
    });
};

// Function to find a user by email
exports.findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (error, results) => {
        if (error) return callback(error);
        callback(null, results[0]);
    });
};