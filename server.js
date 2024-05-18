const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "components" directory
app.use('/components', express.static(path.join(__dirname, 'components')));

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve static files from the "pages" directory
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});
app.get('/compete_hub', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'competition.html'));
});
app.get('/algorithm_hub', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'algorithm.html'));
});
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'registration.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
