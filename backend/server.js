const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('algorithm.db');
const app = express();

let algorithms = {};

// Serve static files from the "frontend" directory
app.use(express.static(path.resolve(__dirname, '../frontend')));
app.use(bodyParser.json());



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

// Serve algorithm.html page when accessing /algorithm_hub
app.get('/algorithm_hub', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/algorithm.html'));
});

// API endpoint to get all algorithm sites
app.get('/api/algorithm_sites', (req, res) => {
    const query = "SELECT * FROM algorithmSite";
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if(!rows || rows.length ===0){
            res.status(400).send('Data not found');
            return;
        }
        res.status(200).json(rows);
    });
});

app.get('/registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/registration.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
