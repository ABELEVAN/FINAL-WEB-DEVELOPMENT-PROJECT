document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Check if the signup form exists and then attach the event listener
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                user_type: document.getElementById('userType').value,
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
            };

            const result = await signupUser(userData);
            if (result && result.message === 'User registered successfully.') {
                alert('Sign-up successful! Please log in.');
                window.location.href = 'login.html';
            } else {
                alert('Sign-up failed. Try again.');
            }
        });
    }

    // Check if the login form exists and then attach the event listener
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const credentials = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            };

            const result = await loginUser(credentials);
            if (result && result.token) {
                alert('Login successful!');
                window.location.href = 'dashboard.html'; // Redirect to dashboard
            } else {
                alert('Login failed. Check your credentials.');
            }
        });
    }
});