const API_BASE_URL = 'http://localhost:3000/api';

// Fetch all available food listings
async function fetchFoodListings() {
    try {
        const response = await fetch(`${API_BASE_URL}/food`);
        if (!response.ok) throw new Error('Failed to fetch food listings.');
        return await response.json();
    } catch (error) {
        console.error('Error fetching food listings:', error);
        return [];
    }
}

// Add a new food listing
async function addFoodListing(foodData) {
    
    try {
        const response = await fetch(`${API_BASE_URL}/food`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify(foodData),
        });
        if (!response.ok) throw new Error('Failed to add food listing.');
        return await response.json();
    } catch (error) {
        console.error('Error adding food listing:', error);
    }
}

// User sign-up
async function signupUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Sign-up failed.');
        return await response.json();
    } catch (error) {
        console.error('Error signing up:', error);
    }
}

// User login
async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) throw new Error('Login failed.');
        const data = await response.json();
        localStorage.setItem('token', data.token); // Save JWT token
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
    }
}