const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "frontend" directory
app.use(express.static(path.join(process.cwd(), '../frontend')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../frontend', 'pages/index.html'));
});
app.get('/compete_hub', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../frontend', 'pages/competition.html'));
});
app.get('/algorithm_hub', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../frontend', 'pages/algorithm.html'));
});
app.get('/registration', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../frontend', 'pages/registration.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
