const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const algorithmdb = new sqlite3.Database('algorithm.db');
const competitiondb = new sqlite3.Database('competition.db');
const app = express();

// Serve static files from the "frontend" directory
app.use(express.static(path.resolve(__dirname, '../frontend')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'static/images/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

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
    algorithmdb.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if (!rows || rows.length === 0) {
            res.status(400).send('Data not found');
            return;
        }
        res.status(200).json(rows);
    });
});

app.get('/registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/registration.html'));
});

app.post('/register', upload.single('poster'), (req, res) => {
    const { title, startDate, endDate, homepage, context, tags, company, name, email } = req.body;
    const poster = req.file ? req.file.path : null;
    const competition_id = `${title}${startDate}`;

    const insertCompetition = `
        INSERT INTO Competition (competition_id, title, startDate, endDate, homepage, poster, context, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const insertContactPerson = `
        INSERT INTO ContactPerson (competition_id, company, name, email)
        VALUES (?, ?, ?, ?)
    `;

    competitiondb.serialize(() => {
        competitiondb.run(insertCompetition, [competition_id, title, startDate, endDate, homepage, poster, context, tags], (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).send('Internal server error');
                return;
            }

            competitiondb.run(insertContactPerson, [competition_id, company, name, email], (err) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).send('Internal server error');
                    return;
                }
                // Redirect the client to the home page after displaying the alert
                res.status(200).send('<script>alert("Registration successful"); window.location.href = "/";</script>');
            });
        });
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
