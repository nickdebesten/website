document.getElementById('contact_form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Rate limiting settings
    const rateLimitWindow = 10 * 60 * 1000; // 10 minutes in milliseconds
    const maxAttempts = 1; // Max form submissions in the time window

    // Check if the user has exceeded the rate limit
    const now = Date.now();
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    const submitAttempts = parseInt(localStorage.getItem('submitAttempts')) || 0;

    if (lastSubmitTime && now - lastSubmitTime < rateLimitWindow && submitAttempts >= maxAttempts) return alert('U heeft dit te vaak gedaan. Er wordt zo snel mogelijk contact met u opgenomen.')
         // Prevent submission
    // return alert(`You've reached the limit of ${maxAttempts} submissions. Please wait a few minutes and try again.`);

    // Collect form data
    const formData = {
        first_name: document.querySelector('[name="first_name"]').value,
        last_name: document.querySelector('[name="last_name"]').value,
        email: document.querySelector('[name="email"]').value,
        phone: document.querySelector('[name="phone"]').value,
    };

    try {
        if (lastSubmitTime && now - lastSubmitTime < rateLimitWindow && submitAttempts >= maxAttempts) return console.log(lastSubmitTime && now - lastSubmitTime < rateLimitWindow && submitAttempts >= maxAttempts)
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Succesvol verstuurd! Er wordt zo snelmogelijk contact met je opgenomen!');
            // Update submission data in localStorage
            localStorage.setItem('lastSubmitTime', now); // Store the current timestamp
            localStorage.setItem('submitAttempts', submitAttempts + 1); // Increment submission count
        } else {
            alert('Er is iets fout gegaan, probeer het later opnieuw');
        }
    } catch (error) {
        console.error('Error submitting the form:', error);
        alert('An error occurred while submitting the form.');
    }

    // Reset the rate limit after the window has passed
    if (now - lastSubmitTime >= rateLimitWindow) {
        localStorage.setItem('submitAttempts', 0); // Reset the attempts count
    }
});
