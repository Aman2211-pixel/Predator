document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the form from submitting

        // Basic validation
        if (emailInput.value.trim() === '' || passwordInput.value.trim() === '') {
            alert('Please enter both email and password.');
            return;
        }

        // Basic email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        // If validation passes, you would typically send the login data to a server here
        console.log('Login attempt:', {
            email: emailInput.value,
            password: passwordInput.value
        });

        alert('Login attempt recorded. In a real application, this would be sent to a server.');
        window.location.href="./Homepage.html"
        // Clear the form
        loginForm.reset();

    });

    // Add animation to input labels
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});