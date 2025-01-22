const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// JSON-bestand om gegevens op te slaan
const submissionsFile = path.join(__dirname, 'submissions.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Statische bestanden (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minuten
    max: 5, // Maximaal 5 aanvragen per IP
    message: 'Te veel verzoeken vanaf dit IP, probeer het later opnieuw.',
});

app.use('/api', limiter); // Rate limiting voor API-routes

// Helperfunctie om JSON-bestand te lezen
function readSubmissions() {
    if (!fs.existsSync(submissionsFile)) {
        // Als het bestand nog niet bestaat, maak een leeg bestand
        fs.writeFileSync(submissionsFile, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(submissionsFile, 'utf8'));
}

// Helperfunctie om JSON-bestand te schrijven
function writeSubmissions(data) {
    fs.writeFileSync(submissionsFile, JSON.stringify(data, null, 2));
}

// API Endpoint voor het verwerken van formulieren
app.post('/api/submit', (req, res) => {
    const { first_name, last_name, email, phone, interest } = req.body;

    // Controleer of alle velden zijn ingevuld
    if (!first_name || !last_name || !email || !phone || !interest) {
        return res.status(400).json({ message: 'Alle velden zijn verplicht.' });
    }

    // Lees bestaande inzendingen
    const submissions = readSubmissions();

    // Controleer of het e-mailadres al bestaat
    const existingSubmission = submissions.find((entry) => entry.email === email);
    if (existingSubmission) {
        return res.status(409).json({
            message: 'Dit e-mailadres is al gebruikt. Er wordt zo snel mogelijk contact met u opgenomen.',
        });
    }

    // Voeg nieuwe inzending toe
    const newSubmission = { first_name, last_name, email, phone, interest, timestamp: new Date().toISOString() };
    submissions.push(newSubmission);

    // Schrijf naar JSON-bestand
    writeSubmissions(submissions);
    emailVersturenKlant(first_name,last_name,email)
    emailsVersturenDennis(first_name,last_name,email,phone,interest)

    // Stuur succesrespons terug
    res.status(200).json({ message: 'Formulier succesvol verzonden!' });
});

// Route voor de homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route voor de pagina "Over Ons"
app.get('/over-ons', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'over-ons.html'));
});

// Route voor niet-bestaande pagina's (404)
app.use((req, res) => {
    res.status(404).send('Pagina niet gevonden');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host: 'antispam2.winsys.eu',  // Replace with your SMTP server
	port: 587,                 // Replace with your SMTP port
	secure: false,             // Set to true if using port 465, false for 587
	auth: {
	  user: 'mailws',    // Replace with your SMTP username
	  pass: 'Mail123abc!!',    // Replace with your SMTP password or API key
	},
  });
async function emailVersturenKlant(voornaam,achternaam,email) {
    const mailOptions = {
        from: 'Go2B-fit <no_reply@gratiskut.host>', // Your email address
        to: email, // User's email
        subject: `Aanmelding Go2B-fit`, // Subject of the email in Dutch
        text: `Beste ${voornaam} ${achternaam},\n\nBedankt voor je intresse in Go2B-fit, er wordt zo spoedig mogelijk contact met je opgezocht!\n\nMet vriendelijke groet,\nDennis de Bruijn\nEigenaar en Personal Trainer\nGo2B-fit` // Email content in Dutch
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(`Error sending email: ${error}`);
        }
        console.log(`Email sent: ${info.response}`);
    });
}

async function emailsVersturenDennis(voornaam,achternaam,email,telefoonnummer,text) {

  const mailOptions = {
    from: 'Go2B-fit <no_reply@gratiskut.host>', // Your email address
    to: 'nick.heijden2@gmail.com', // User's email
    subject: `Website: aanmeldingen`, // Subject of the email in Dutch
    text: `Hoi Dennis, er is een nieuwe aanmelding!\n\nVoornaam: ${voornaam}\nAchternaam: ${achternaam}\nEmail: ${email}\nTelefoonnummer: ${telefoonnummer}\n\nDeze persoon wilt: ${text}` // Email content in Dutch
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(`Error sending email: ${error}`);
    }
    console.log(`Email sent: ${info.response}`);
});
}