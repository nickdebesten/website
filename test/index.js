const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle form submissions
app.post('/submit', (req, res) => {
    const { first_name, last_name, email, phone } = req.body;

    console.log('Received form data:', { first_name, last_name, email, phone });

    // Perform any additional logic here (e.g., save to database)

    res.status(200).send('Succesvol verstuurd! Er wordt zo snelmogelijk contact met je opgenomen');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});