import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import competitionRouter from './src/routers/competitionRouter.js';
import postRouter from './src/routers/postRouter.js';
import commentRouter from './src/routers/commentRouter.js';
import algorithmRouter from './src/routers/algorithmRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "frontend" directory
app.use(express.static(path.resolve(__dirname, '../frontend')));
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const competitiondb = new sqlite3.Database('competition.db');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'static/images/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use('/api/competition', competitionRouter);
app.use('/api/competition/:competitionId/posts', postRouter);
app.use('/api/competition/:competitionId/posts/:postId/comments', commentRouter);
app.use('/api/algorithm_sites', algorithmRouter);

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/index.html'));
});
app.get('/compete_hub', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/competition.html'));
});
app.get('/compete_hub/:competitionId', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/competition_detail.html'));
});
app.get('/compete_hub/:competitionId/posts*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/competition_postBoard.html'));
});
app.get('/algorithm_hub', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/algorithm.html'));
});
app.get('/registration', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/pages/registration.html'));
});

app.post('/register', upload.single('poster'), (req, res) => {
    const { title, startDate, endDate, homepage, context, tags, company, name, email } = req.body;
    const poster = req.file ? req.file.path : null;
    const competition_id = uuidv4();

    const insertCompetition = `
        INSERT INTO Competition (competition_id, title, startDate, endDate, homepage, poster, context, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const insertContactPerson = `
        INSERT INTO ContactPerson (competition_id, company, name, email)
        VALUES (?, ?, ?, ?)
    `;

    competitiondb.serialize(() => {
        competitiondb.run(insertCompetition, [competition_id, title, startDate, endDate, homepage, poster, decodeURIComponent(context), tags], (err) => {
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
                res.status(200).send('<script>alert("Registration successful"); window.location.href = "/";</script>');
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});