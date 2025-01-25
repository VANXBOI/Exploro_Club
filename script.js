// Dummy data for trips
const trips = [
    {
        id: 1,
        name: "Trip to Paris",
        description: "Explore the city of lights and the Eiffel Tower.",
        dates: "March 15-20",
        price: "$1200",
        slots: 10,
        cancellationPolicy: "Full refund if canceled 15 days prior.",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        name: "Trip to Bali",
        description: "Relax on Bali's beautiful beaches.",
        dates: "April 5-10",
        price: "$900",
        slots: 5,
        cancellationPolicy: "50% refund if canceled 7 days prior.",
        image: "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        name: "Trip to New York",
        description: "Visit Times Square and the Statue of Liberty.",
        dates: "May 10-15",
        price: "$1500",
        slots: 8,
        cancellationPolicy: "No refund if canceled less than 7 days prior.",
        image: "https://images.unsplash.com/photo-1476837754190-8036496cea40?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

// Dynamically display trips on the landing page and trips.html
const tripsContainer = document.querySelector(".trips-container");
if (tripsContainer) {
    trips.forEach((trip) => {
        const tripCard = `
        <div class="trip-card">
            <img src="${trip.image}" alt="${trip.name}">
            <h3>${trip.name}</h3>
            <p>${trip.description}</p>
            <p><strong>Dates:</strong> ${trip.dates}</p>
            <p><strong>Price:</strong> ${trip.price}</p>
            <p><strong>Slots Available:</strong> ${trip.slots}</p>
            <button onclick="bookTrip(${trip.id})">Book Now</button>
        </div>
        `;
        tripsContainer.innerHTML += tripCard;
    });
}

// Function to display trip details when "View Details" is clicked (used on index.html)
function viewTripDetails(tripId) {
    const trip = trips.find((t) => t.id === tripId);
    alert(`
        Name: ${trip.name}
        Description: ${trip.description}
        Dates: ${trip.dates}
        Price: ${trip.price}
        Available Slots: ${trip.slots}
        Cancellation Policy: ${trip.cancellationPolicy}
    `);
}

// Function to handle trip booking
function bookTrip(tripId) {
    const trip = trips.find((t) => t.id === tripId);

    if (trip && trip.slots > 0) {
        trip.slots -= 1;
        alert(`Booking successful for ${trip.name}! Slots remaining: ${trip.slots}`);
        location.reload(); // Reload the page to reflect updated slots
    } else {
        alert("Sorry, no slots available for this trip.");
    }
}

// Initialize Google Map (used on trips.html)
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.8566, lng: 2.3522 }, // Default to Paris
        zoom: 3,
    });

    // Trip locations
    const locations = [
        { name: "Paris", position: { lat: 48.8566, lng: 2.3522 } },
        { name: "Bali", position: { lat: -8.3405, lng: 115.092 } },
        { name: "New York", position: { lat: 40.7128, lng: -74.0060 } },
    ];

    // Add markers
    locations.forEach((location) => {
        new google.maps.Marker({
            position: location.position,
            map,
            title: location.name,
        });
    });
}

// Login Form Validation (used on login.html)
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Fake user database
            const users = [{ email: "user@example.com", password: "password123" }];

            const user = users.find((u) => u.email === email && u.password === password);

            if (user) {
                alert("Login successful!");
                localStorage.setItem("loggedIn", true); // Fake login state
                window.location.href = "index.html"; // Redirect to home
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // Signup Form Validation (used on signup.html)
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            if (!name || !email || !password || !confirmPassword) {
                alert("Please fill out all fields.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Fake account creation (for now, just log the result)
            alert(`Account created successfully for ${name}!`);
            console.log({ name, email, password });

            // Redirect to login page
            window.location.href = "login.html";
        });
    }
});

// Filter Trips Logic
document.addEventListener("DOMContentLoaded", () => {
    const filterForm = document.getElementById("filter-form");

    // Filter form submission handler
    filterForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const priceFilter = document.getElementById("price-filter").value;
        const dateFilter = document.getElementById("date-filter").value;
        const locationFilter = document.getElementById("location-filter").value.toLowerCase();

        // Filter trips based on criteria
        const filteredTrips = trips.filter((trip) => {
            // Price filter
            if (priceFilter === "low" && parseInt(trip.price.replace("$", "")) >= 1000) return false;
            if (priceFilter === "medium" && (parseInt(trip.price.replace("$", "")) < 1000 || parseInt(trip.price.replace("$", "")) > 1500)) return false;
            if (priceFilter === "high" && parseInt(trip.price.replace("$", "")) <= 1500) return false;

            // Date filter (for now, treat all trips as upcoming)
            if (dateFilter === "upcoming" && new Date(trip.dates.split("-")[0]) < new Date()) return false;

            // Location filter
            if (locationFilter && !trip.name.toLowerCase().includes(locationFilter)) return false;

            return true;
        });

        // Display the filtered trips
        displayTrips(filteredTrips);
    });

    // Function to display trips dynamically
    function displayTrips(tripArray) {
        const tripsContainer = document.querySelector(".trips-container");
        tripsContainer.innerHTML = ""; // Clear current trips

        tripArray.forEach((trip) => {
            const tripCard = `
            <div class="trip-card">
                <img src="${trip.image}" alt="${trip.name}">
                <h3>${trip.name}</h3>
                <p>${trip.description}</p>
                <p><strong>Dates:</strong> ${trip.dates}</p>
                <p><strong>Price:</strong> ${trip.price}</p>
                <p><strong>Slots Available:</strong> ${trip.slots}</p>
                <button onclick="bookTrip(${trip.id})">Book Now</button>
            </div>
            `;
            tripsContainer.innerHTML += tripCard;
        });
    }

    // Initial display of all trips
    displayTrips(trips);
});
``
