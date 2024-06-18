import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});