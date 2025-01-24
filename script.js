console.log("Landing page loaded!");

// You can add interactivity like displaying pop-ups or navigating pages later.
// Login Form Validation
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            alert("Login successful!");
        } else {
            alert("Please fill out all fields!");
        }
    });
});
