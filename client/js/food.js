document.addEventListener('DOMContentLoaded', async () => {
	// Fetch and display food listings when the DOM is fully loaded
	const foodListings = await fetchFoodListings();
	const foodContainer = document.getElementById('foodListings');
	const addFoodForm = document.getElementById('addFoodForm');

	// Check if the foodContainer element exists before proceeding
	if (foodContainer) {
		// Loop through each food listing and create elements to display the data
		foodListings.forEach((listing) => {
			const foodDiv = document.createElement('div');
			foodDiv.classList.add('listing-item');

			// Create the inner HTML for the food listing card
			foodDiv.innerHTML = `
                <img src="${
									listing.image_url || '../images/default-image.jpg'
								}" alt="${listing.food_name}">
                <h3>${listing.food_name}</h3>
                <p>${listing.description}</p>
                <p><strong>Quantity:</strong> ${listing.quantity}</p>
                <p><strong>Expires:</strong> ${listing.expiration_date}</p>
                <button onclick="claimFood(${
									listing.listing_id
								})">Claim Food</button>
            `;

			// Append the card to the food container
			foodContainer.appendChild(foodDiv);
		});
	} 

	// Check if the signup form exists and then attach the event listener
	if (addFoodForm) {
		addFoodForm.addEventListener('submit', async function (e) {
			e.preventDefault();

			const foodData = {
				food_name: document.getElementById('foodName').value,
				description: document.getElementById('description').value,
				quantity: document.getElementById('quantity').value,
				expiration_date: document.getElementById('expirationDate').value
			};

			const result = await addFoodListing(foodData);
			if (result && result.message === 'Food listing added successfully.') {
				alert('Food listing added successfully!');
				window.location.href = 'listings.html';
			} else {
				alert('Failed to add food. Try again.');
			}
		});
	}
});

// Function to fetch food listings from the server
async function fetchFoodListings() {
	const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this URL to your actual backend
	try {
		const response = await fetch(`${API_BASE_URL}/food`);
		if (response.ok) {
			return await response.json();
		} else {
			console.error('Failed to fetch food listings.');
			return [];
		}
	} catch (error) {
		console.error('Error fetching food listings:', error);
		return [];
	}
}

// Function to handle claiming food
async function claimFood(listingId) {
	const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this URL to your actual backend
	try {
		const response = await fetch(`${API_BASE_URL}/food/claim`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token') // Include the token if required
			},
			body: JSON.stringify({ listing_id: listingId })
		});

		if (response.ok) {
			alert('Food successfully claimed!');
			window.location.reload(); // Reload the page to reflect the changes
		} else {
			alert('Failed to claim the food.');
		}
	} catch (error) {
		console.error('Error claiming food:', error);
		alert('An error occurred while claiming the food.');
	}
}