const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const algorithmdb = new sqlite3.Database('algorithm.db');
const competitiondb = new sqlite3.Database('competition.db');
const app = express();
const { v4: uuidv4 } = require('uuid');

// 새로운 competition_id를 생성하는 함수
function generateCompetitionId() {
    return uuidv4();
}


// Serve static files from the "frontend" directory
app.use(express.static(path.resolve(__dirname, '../frontend')));
app.use('/static', express.static(path.resolve(__dirname, 'static')));
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
// API endpoint to get top 3 posts by comment count
app.get('/api/top_posts', (req, res) => {
    const query =`
    SELECT rb.post_id, rb.title AS post_title, rb.competition_id, cmp.title AS competition_title, COUNT(c.comment_id) AS comment_count
    FROM RecruitBoard rb
    LEFT JOIN Comment c ON rb.post_id = c.post_id
    INNER JOIN Competition cmp ON rb.competition_id = cmp.competition_id
    GROUP BY rb.post_id
    ORDER BY comment_count DESC
    LIMIT 3
    `;

    competitiondb.all(query, [], (err, rows) => {
        if(err){
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).json(rows);
    });
});
app.get('/compete_hub', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/competition.html'));
});

// API endpoint to get all Competition
app.get('/api/competition', (req, res) => {
    const query = `
        SELECT c.*, 
               COALESCE(COUNT(rb.post_id), 0) AS post_count
        FROM Competition c
        LEFT JOIN RecruitBoard rb ON c.competition_id = rb.competition_id
        GROUP BY c.competition_id
    `;
    competitiondb.all(query, [], (err, rows) => {
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

app.get('/compete_hub/:competitionId', (req, res) => {

     res.sendFile(path.resolve(__dirname, '../frontend', 'pages/competition_detail.html'));
});
app.get('/api/competition/:competitionId', (req, res)=>{
    const competitionId = req.params.competitionId;

    const query = `
        SELECT c.*, cp.company
        FROM Competition c
        INNER JOIN ContactPerson cp ON c.competition_id = cp.competition_id
        WHERE c.competition_id = ?
    `;
    competitiondb.get(query, [competitionId], (err, row)=>{
        if(err){
            console.err(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if(!row){
            res.status(404).send('Competition not found');
            return;
        }
        res.status(200).json(row);
    });
});

app.get('/compete_hub/:competitionId/posts*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'pages/competition_postBoard.html'));
});

app.post('/compete_hub/:competitionId/posts/recruitment', (req, res) => {
    const competition_id = req.params.competitionId;
    const { title, password, context } = req.body;
    const currentDate = new Date();
    const registerDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const insertRecruitment = `
        INSERT INTO RecruitBoard (competition_id, title, password, context, registerDate) VALUES (?, ?, ?, ?, ?)
    `;

    competitiondb.run(insertRecruitment, [competition_id, title, password, context, registerDate], (err) =>{
        if(err){
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).send('Recruitment post saved successfully')
    })
});

app.get('/api/competition/:competitionId/posts', (req, res)=>{
    const competitionId = req.params.competitionId;

    const query = `
        SELECT rb.post_id, rb.title, rb.registerDate, rb.competition_id, COUNT(c.comment_id) AS comment_count
        FROM RecruitBoard rb
        LEFT JOIN Comment c ON rb.post_id = c.post_id
        WHERE rb.competition_id = ?
        GROUP BY rb.post_id
    `;
    competitiondb.all(query, [competitionId], (err, row)=>{
        if(err){
            console.err(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).json(row);
    });
});

app.get('/api/competition/:competitionId/posts/:postId', (req, res)=>{
    const competitionId = req.params.competitionId;
    const postId = req.params.postId;

    const query = `
        SELECT * FROM RecruitBoard
        WHERE competition_id = ? AND post_id = ?
    `;
    competitiondb.get(query, [competitionId, postId], (err, row)=>{
        if(err){
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        if (!row) {
            res.status(404).send('Post not found');
            return;
        }
        res.status(200).json(row);
    });
});

app.post('/compete_hub/:competitionId/posts/:postId/comments', (req, res) => {
    const postId = req.params.postId;
    const { name, comment } = req.body;
    const currentDate = new Date();
    const registerDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    const randomNum = Math.floor(Math.random() * 1001);
    const commentId = postId + ' ' + randomNum;

    const insertComment = `
        INSERT INTO Comment (comment_id, post_id, name, registerDate, comment) VALUES (?, ?, ?, ?, ?)
    `;

    competitiondb.run(insertComment, [commentId, postId, name, registerDate, comment], (err) =>{
        if(err){
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).send('Comment saved successfully')
    })
});

app.get('/api/competition/:competitionId/posts/:postId/comments', (req, res)=>{
    const postId = req.params.postId;

    const query = `
        SELECT * FROM Comment
        WHERE post_id = ?
    `;
    competitiondb.all(query, [postId], (err, rows)=>{
        if(err){
            console.error(err.message);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).json(rows);
    });
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
    const competition_id = generateCompetitionId();

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
