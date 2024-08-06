// Get form element
const form = document.querySelector('.form');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate form
    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // If all validations pass, you can submit the form or send data to server
    console.log('Registration successful!');
    window.location.href="./Login.html"
    // Here you would typically send the data to your server
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}