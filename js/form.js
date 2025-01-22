document.getElementById('contact_form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Voorkom standaard formulierverzending

    // Verzamelen van formulierdata
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Verstuur formulierdata naar de server
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Succesvolle verzending
            alert('Formulier succesvol verzonden!');
            event.target.reset(); // Reset het formulier
        } else {
            // Fout van de server
            const error = await response.json();
            alert(`Fout: ${error.message}`);
        }
    } catch (error) {
        // Netwerk- of andere fouten
        console.error('Fout bij het verzenden van het formulier:', error);
        alert('Er is een probleem opgetreden bij het verzenden. Probeer het later opnieuw.');
    }
});
