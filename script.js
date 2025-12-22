// Google Sheets Web App URL - You'll need to set this up
// Instructions are in the README.md file
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';

document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    formMessage.style.display = 'none';

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value || 'Not provided',
        guests: document.getElementById('guests').value,
        attendance: document.getElementById('attendance').value,
        dietary: document.getElementById('dietary').value || 'None',
        message: document.getElementById('message').value || 'No message',
        timestamp: new Date().toISOString()
    };

    try {
        // Check if Google Sheets URL is configured
        if (GOOGLE_SHEETS_URL === 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE') {
            throw new Error('Google Sheets integration not yet configured. Please see README.md for setup instructions.');
        }

        // Send data to Google Sheets
        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Show success message
        formMessage.textContent = 'Thank you! Your RSVP has been submitted successfully.';
        formMessage.className = 'form-message success';

        // Reset form
        this.reset();

    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = error.message || 'Sorry, there was an error submitting your RSVP. Please try again or contact us directly.';
        formMessage.className = 'form-message error';
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
    }
});

// Form validation
document.getElementById('guests').addEventListener('input', function() {
    if (this.value < 1) this.value = 1;
    if (this.value > 10) this.value = 10;
});

// Smooth scrolling for any future anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
