const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "frontend" directory
app.use(express.static(path.resolve(__dirname, '../frontend')));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/index.html'));
});
app.get('/compete_hub', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/competition.html'));
});
app.get('/compete_hub/1', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/competition_detail.html'));
});
app.get('/compete_hub/1/posts*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/competition_postBoard.html'));
});
app.get('/algorithm_hub', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/algorithm.html'));
});
app.get('/registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/registration.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
